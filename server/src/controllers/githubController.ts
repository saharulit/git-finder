import axios from 'axios';
import { Request, Response } from 'express';
import { BASE_GITHUB_API_URL, DEFAULT_LIMIT } from '../consts';

interface GitHubUser {
  username: string;
  image: string;
  publicRepos: number;
}

export const searchGitHubUsers = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.per_page as string) || DEFAULT_LIMIT;

  if (!query) {
    res.status(400).json({ error: 'Query parameter "q" is required' });
    return;
  }

  try {
    const usersResponse = await axios.get(
      `${BASE_GITHUB_API_URL}/search/users`,
      {
        params: { q: query, page, per_page: perPage },
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const users = usersResponse.data.items;
    const totalCount = usersResponse.data.total_count;
    const totalPages = Math.ceil(totalCount / perPage);

    const userPromises = users.map(
      async (user: { login: string; avatar_url: string }) => {
        const userResponse = await axios.get(
          `${BASE_GITHUB_API_URL}/users/${user.login}`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28',
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
          }
        );

        return {
          username: user.login,
          image: user.avatar_url,
          publicRepos: userResponse.data.public_repos,
        } as GitHubUser;
      }
    );

    const userData: GitHubUser[] = await Promise.all(userPromises);

    const hasNextPage = page < totalPages;

    res.json({
      totalCount: totalCount,
      pageInfo: {
        totalPages: totalPages,
        page,
        perPage: perPage,
        hasNextPage: hasNextPage,
      },
      data: userData,
    });
    return;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching data from GitHub' });
    return;
  }
};
