import { Router } from 'express';
import { searchGitHubUsers } from '../controllers/githubController';

const router = Router();

router.get('/search_github_users', searchGitHubUsers);

export default router;
