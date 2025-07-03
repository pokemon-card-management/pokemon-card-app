import { Hono } from 'hono';
import { signIn, getProfile } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const authRouter = new Hono();

// サインインエンドポイント
authRouter.post('/auth/signin', signIn);

// プロフィール取得エンドポイント（認証が必要）
authRouter.get('/auth/profile', authMiddleware, getProfile);

export default authRouter;
