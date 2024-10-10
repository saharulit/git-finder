import { mockUsers } from '../entities/gitHubUser';
import { BASE_URL, searchUsers } from './GitHubService';

describe('GitHubService', () => {

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return mocked GitHub users', async () => {
    const mockFetchResponse = {
      ok: true,
      json: async () => ({
        data: mockUsers,
        totalCount: 8,
        pageInfo: {
          hasNextPage: false,
        },
      }),
    };
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockFetchResponse as Response);

    const result = await searchUsers('userName', 1,2);

    expect(result).toEqual({
      data: mockUsers,
      totalCount: 8,
      pageInfo: {
        hasNextPage: false,
      },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/search_github_users?q=userName&page=1&per_page=2`,
      { method: 'GET' }
    );
  });
});
