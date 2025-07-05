import { serve } from 'bun';
import router from './index';

const port = process.env.PORT || 3000;

serve({
  fetch: router.fetch,
  port: Number(port),
  hostname: 'localhost',
});

console.log(`Server is running on http://localhost:${port}`);
