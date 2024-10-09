import { GitHubUser } from '../entities/gitHubUser';

const BASE_URL = 'http://localhost:3010/api';

export interface GitHubUserResponse {
  data: GitHubUser[];
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
  };
}

export class GitHubService {
  baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async searchUsers(
    query: string,
    page: number,
    perPage: number = 15
  ): Promise<GitHubUserResponse> {
    const response = await fetch(
      `${this.baseUrl}/search_github_users?q=${query}&page=${page}&per_page=${perPage}`,
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
}