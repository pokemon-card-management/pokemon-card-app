import { Hono } from 'hono';
import pingRouter from './routes/ping';

const app = new Hono();

app.get('/', (c) => c.text('Hello, Bun + Hono!'));
app.route('/', pingRouter);

export default app;
