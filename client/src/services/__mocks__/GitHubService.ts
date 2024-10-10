import { vi } from 'vitest';
import { mockUsers } from '../../entities/gitHubUser';
import { DEFAULT_LIMIT } from '../consts';

export const mockSearchUsersResponse = vi.fn().mockImplementation(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_query: string, _page: number, _perPage = DEFAULT_LIMIT) => {
    return {
      data: mockUsers,
      totalCount: 8,
      pageInfo: {
        hasNextPage: false,
      },
    };
  }
);

export const searchUsers = mockSearchUsersResponse;
