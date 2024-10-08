import React from 'react';
import { GitHubUser } from '../entities/gitHubUser';
import { GITHUB_URL } from '../consts';

interface GitHubUserCardProps {
  user: GitHubUser;
}

const GitHubUserCard: React.FC<GitHubUserCardProps> = ({ user }) => {
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
        <p className="text-gray-500 text-sm mb-3">
          Public Repositories:{' '}
          <span className="font-semibold">{user.publicRepos}</span>
        </p>
      </div>
    </a>
  );
};

export default GitHubUserCard;
