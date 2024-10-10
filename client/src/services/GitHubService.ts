import { GitHubUser } from '../entities/gitHubUser';

export const BASE_URL = 'http://localhost:3010/api';

export interface GitHubUserResponse {
  data: GitHubUser[];
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
  };
}

export const searchUsers = async (
  query: string,
  page: number,
  perPage = 15
): Promise<GitHubUserResponse> => {
    const response = await fetch(
      `${BASE_URL}/search_github_users?q=${query}&page=${page}&per_page=${perPage}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const result = await response.json();
    return result as GitHubUserResponse;
}
