import { Hono } from 'hono';
import { signIn, getProfile } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const authRouter = new Hono();

authRouter.post('/auth/signin', signIn);
authRouter.get('/auth/profile', authMiddleware, getProfile);

export default authRouter;
