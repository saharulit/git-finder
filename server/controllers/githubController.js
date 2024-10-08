const axios = require('axios');
const { DEFAULT_LIMIT, BASE_GITHUB_API_URL } = require('../consts');


const searchGitHubUsers = async (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || DEFAULT_LIMIT;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const usersResponse = await axios.get(`${BASE_GITHUB_API_URL}/search/users`, {
      params: { q: query, page, per_page: perPage },
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
      },
    });

    const users = usersResponse.data.items;
    const totalCount = usersResponse.data.total_count;
    const totalPages = Math.ceil(totalCount / perPage);

    const userPromises = users.map(async (user) => {
      const userResponse = await axios.get(`${BASE_GITHUB_API_URL}/users/${user.login}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
        },
      });

      return {
        username: user.login,
        image: user.avatar_url,
        publicRepos: userResponse.data.public_repos,
      };
    });

    const userData = await Promise.all(userPromises);

    const hasNextPage = page < totalPages;

    res.json({
      totalCount: totalCount,
      totalPages: totalPages,
      page,
      perPage: perPage,
      hasNextPage: hasNextPage,
      users: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from GitHub' });
  }
};

module.exports = { searchGitHubUsers };
