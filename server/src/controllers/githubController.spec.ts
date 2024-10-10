import express from 'express';
import request from 'supertest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { searchGitHubUsers } from './githubController';
import { BASE_GITHUB_API_URL, DEFAULT_LIMIT } from '../consts';

const app = express();
const mock = new MockAdapter(axios);

app.get('/search-users', searchGitHubUsers);

describe('GitHub API Controller', () => {
  afterEach(() => {
    mock.reset();
  });

  describe('searchGitHubUsers', () => {
    it('should return users when a valid query is provided', async () => {
      const mockUsers = {
        total_count: 1,
        items: [
          {
            login: 'octocat',
            avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
          },
        ],
      };

      mock.onGet(/search\/users/).reply(200, mockUsers);
      mock.onGet(`${BASE_GITHUB_API_URL}/users/octocat`).reply(200, {
        public_repos: 8,
      });

      const response = await request(app).get('/search-users?q=octocat');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        totalCount: 1,
        pageInfo: {
          totalPages: 1,
          page: 1,
          perPage: DEFAULT_LIMIT,
          hasNextPage: false,
        },
        data: [
          {
            username: 'octocat',
            image: 'https://avatars.githubusercontent.com/u/583231?v=4',
            publicRepos: 8,
          },
        ],
      });
    });

    it('should return 400 if the query parameter "q" is missing', async () => {
      const response = await request(app).get('/search-users');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Query parameter "q" is required',
      });
    });

    it('should return 500 if there is an error fetching data from GitHub', async () => {
      mock.onGet(/search\/users/).reply(500);

      const response = await request(app).get('/search-users?q=octocat');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'An error occurred while fetching data from GitHub',
      });
    });
  });
});
