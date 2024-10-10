import React from 'react';
import { GitHubUser } from '../../entities/gitHubUser';
import { GITHUB_URL } from '../../consts';
import { CounterDisplay } from '../CounterDisplay/CounterDisplay';

interface GitHubUserCardProps {
  user: GitHubUser;
}

export const GitHubUserCard: React.FC<GitHubUserCardProps> = ({ user }) => {
  return (
    <a
      key={user.username}
      href={`${GITHUB_URL}/${user.username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block max-w-s rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={user.image}
        alt={user.username}
      />
      <div className="flex flex-col items-center p-4">
        <div className="font-bold text-lg mb-2 text-center">
          {user.username}
        </div>
        <CounterDisplay
          title="Public Repositories"
          count={user.publicRepos}
          className="text-sm"
        />
      </div>
    </a>
  );
};