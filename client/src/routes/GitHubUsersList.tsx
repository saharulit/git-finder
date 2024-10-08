import Card from '../components/Card';
import { mockUsers } from '../entities/gitHubUser';

const GitHubUsersList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {mockUsers.map((user) => (
        <Card key={user.username} user={user} />
      ))}
    </div>
  );
};

export default GitHubUsersList;
