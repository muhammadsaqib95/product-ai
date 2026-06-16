import 'dotenv/config';
import express from 'express';
import api from './src/api.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', api);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
