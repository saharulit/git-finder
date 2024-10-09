import { vi } from 'vitest';
import { mockUsers } from '../../entities/gitHubUser';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mockSearchUsersResponse = vi.fn().mockImplementation(async (_query: string, _page: number, _perPage: number = 15) => {
  return {
    data: mockUsers,
    totalCount: 8,
    pageInfo: {
      hasNextPage: false,
    },
  };
});

export const GitHubService = vi.fn().mockImplementation(() => ({
  searchUsers: mockSearchUsersResponse,
}));
