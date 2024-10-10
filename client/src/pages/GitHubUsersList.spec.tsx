import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GitHubUsersList from './GitHubUsersList';

vi.mock('../services/GitHubService');

describe('GitHubUsersList', () => {
  it('renders input and displays users after search', async () => {
    render(<GitHubUsersList />);

    fireEvent.change(screen.getByPlaceholderText('Search GitHub users...'), {
      target: { value: 'octocat' },
    });

    await waitFor(() =>
      expect(screen.getByText('octocat')).toBeInTheDocument()
    );

    expect(screen.getByText('octocat')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /octocat/i })).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/583231?v=4'
    );
  });

  it('displays "Please enter a search term." when search input is empty', async () => {
    render(<GitHubUsersList />); 

    expect(screen.getByText('Please enter a search term.')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search GitHub users...'), {
      target: { value: 'octocat' },
    });

    fireEvent.change(screen.getByPlaceholderText('Search GitHub users...'), {
      target: { value: '' },
    });

    expect(screen.getByText('Please enter a search term.')).toBeInTheDocument();
  });
});
