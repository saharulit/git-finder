import { GitHubService } from './GitHubService';
import { mockUsers } from '../entities/gitHubUser';

describe('GitHubService', () => {
  const service = new GitHubService();

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

    const result = await service.searchUsers('userName', 1,2);

    expect(result).toEqual({
      data: mockUsers,
      totalCount: 8,
      pageInfo: {
        hasNextPage: false,
      },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${service.baseUrl}/search_github_users?q=userName&page=1&per_page=2`,
      { method: 'GET' }
    );
  });
});
