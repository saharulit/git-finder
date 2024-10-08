export interface GitHubUser {
  username: string;
  image: string;
  publicRepos: number;
}

export const mockUsers: GitHubUser[] = [
  {
    username: 'octocat',
    image: 'https://avatars.githubusercontent.com/u/583231?v=4',
    publicRepos: 8,
  },
  {
    username: 'torvalds',
    image: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    publicRepos: 2,
  },
  {
    username: 'mojombo',
    image: 'https://avatars.githubusercontent.com/u/1?v=4',
    publicRepos: 62,
  },
  {
    username: 'defunkt',
    image: 'https://avatars.githubusercontent.com/u/2?v=4',
    publicRepos: 29,
  },
  {
    username: 'pjhyett',
    image: 'https://avatars.githubusercontent.com/u/3?v=4',
    publicRepos: 15,
  },
  {
    username: 'wycats',
    image: 'https://avatars.githubusercontent.com/u/4?v=4',
    publicRepos: 11,
  },
  {
    username: 'schacon',
    image: 'https://avatars.githubusercontent.com/u/5?v=4',
    publicRepos: 34,
  },
  {
    username: 'GitHub',
    image: 'https://avatars.githubusercontent.com/u/9919?v=4',
    publicRepos: 30,
  },
];
