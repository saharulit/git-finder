import { render, screen } from '@testing-library/react';
import { GitHubUser } from '../entities/gitHubUser';
import Card from './GitHubUserCard';
import GitHubUserCard from './GitHubUserCard';

const mockUser: GitHubUser = {
  username: 'octocat',
  image: 'https://avatars.githubusercontent.com/u/583231?v=4',
  publicRepos: 8,
};

describe('GitHubUserCard', () => {
  it('renders user information correctly', () => {
    render(<Card user={mockUser} />);
    
    expect(screen.getByText('octocat')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /octocat/i })).toHaveAttribute('src', mockUser.image);
    expect(screen.getByText('Public Repositories:')).toBeInTheDocument();
    expect(screen.getByText(mockUser.publicRepos)).toBeInTheDocument();
  });

  it('renders link with correct href', () => {
    render(<GitHubUserCard user={mockUser} />);
    
    const linkElement = screen.getByRole('link', { name: /octocat/i });
    expect(linkElement).toHaveAttribute('href', `https://github.com/${mockUser.username}`);
  });
});
