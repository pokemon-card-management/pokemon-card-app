import { Hono } from 'hono';
import { serve } from 'bun';

const app = new Hono();

app.get('/', (c) => c.text('Hello, Bun + Hono!'));

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log('Server running on http://localhost:3000');
