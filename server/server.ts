import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import githubRoutes from './src/routes/github';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());

app.use('/api', githubRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
