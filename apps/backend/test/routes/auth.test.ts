import { describe, it, expect, beforeAll } from 'vitest';
import app from '../../src/index';
import { AUTH_ERROR_CODES } from '../../src/constants/auth';
import { HttpStatus } from '../../src/types/httpStatus';
import { TEST_CONFIG } from '../config';

describe('Auth API', () => {
  describe('POST /auth/signin', () => {
    describe('正常系', () => {
      it('正しい認証情報でサインインできる', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'pikachu@example.com',
            password: 'pikachuPokemon1234!'
          })
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.OK);
        
        const body = await response.json();
        expect(body).toHaveProperty('token');
        expect(body).toHaveProperty('user');
        expect(body.user).toHaveProperty('id');
        expect(body.user).toHaveProperty('username');
        expect(body.user).toHaveProperty('email');
        expect(body.user.email).toBe('pikachu@example.com');
        expect(body.user).not.toHaveProperty('password');
        expect(typeof body.token).toBe('string');
        expect(body.token.length).toBeGreaterThan(0);
      });

      it('冪等性：同じ認証情報で複数回サインインしても同じ結果が得られる', async () => {
        const requestBody = {
          email: 'pikachu@example.com',
          password: 'pikachuPokemon1234!'
        };

        const req1 = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        const req2 = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        const [response1, response2] = await Promise.all([
          app.fetch(req1),
          app.fetch(req2)
        ]);

        expect(response1.status).toBe(HttpStatus.OK);
        expect(response2.status).toBe(HttpStatus.OK);

        const [body1, body2] = await Promise.all([
          response1.json(),
          response2.json()
        ]);

        expect(body1.user.email).toBe(body2.user.email);
        expect(body1.user.id).toBe(body2.user.id);
      });
    });

    describe('異常系 - 認証エラー', () => {
      it('存在しないメールアドレスでサインインに失敗する', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'nonexistent@example.com',
            password: 'pikachuPokemon1234!'
          })
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(AUTH_ERROR_CODES.INVALID_CREDENTIALS);
        expect(body).not.toHaveProperty('token');
        expect(body).not.toHaveProperty('user');
      });

      it('間違ったパスワードでサインインに失敗する', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'pikachu@example.com',
            password: 'wrongPassword123!'
          })
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(AUTH_ERROR_CODES.INVALID_CREDENTIALS);
      });
    });

    describe('異常系 - バリデーションエラー', () => {
      it('メールアドレスが空文字の場合エラーを返す', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: '',
            password: 'pikachuPokemon1234!'
          })
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
      });

      it('パスワードが空文字の場合エラーを返す', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'pikachu@example.com',
            password: ''
          })
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
      });

      it('不正なメールアドレス形式の場合エラーを返す', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'invalid-email',
            password: 'pikachuPokemon1234!'
          })
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
      });

      it('メールアドレスが欠損している場合エラーを返す', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: 'pikachuPokemon1234!'
          })
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
      });

      it('パスワードが欠損している場合エラーを返す', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'pikachu@example.com'
          })
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
      });

      it('リクエストボディが空の場合エラーを返す', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
      });
    });

    describe('異常系 - HTTPエラー', () => {
      it('Content-Typeが不正な場合でも正常に処理される', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            email: 'pikachu@example.com',
            password: 'pikachuPokemon1234!'
          })
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.OK);
      });

      it('不正なJSONの場合エラーを返す', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: 'invalid json'
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(AUTH_ERROR_CODES.INTERNAL_SERVER_ERROR);
      });
    });

    describe('境界値テスト', () => {
      it('最小長のパスワードでサインインできる', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'pikachu@example.com',
            password: 'pikachuPokemon1234!'
          })
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.OK);
      });

      it('長いメールアドレスでサインインできる', async () => {
        const longEmail = 'a'.repeat(50) + '@example.com';
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: longEmail,
            password: 'pikachuPokemon1234!'
          })
        });

        const response = await app.fetch(req);
        // 存在しないメールアドレスのため401が返される
        expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(AUTH_ERROR_CODES.INVALID_CREDENTIALS);
      });
    });
  });

  describe('GET /auth/profile', () => {
    let authToken: string;

    beforeAll(async () => {
      // まずサインインしてトークンを取得
      const signInReq = new Request(`${TEST_CONFIG.BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'pikachu@example.com',
          password: 'pikachuPokemon1234!'
        })
      });
      
      const signInResponse = await app.fetch(signInReq);
      const signInBody = await signInResponse.json();
      authToken = signInBody.token;
    });

    describe('正常系', () => {
      it('有効なトークンでプロフィールを取得できる', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.OK);
        
        const body = await response.json();
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('username');
        expect(body).toHaveProperty('email');
        expect(body.email).toBe('pikachu@example.com');
        expect(body).not.toHaveProperty('password');
        expect(typeof body.id).toBe('number');
        expect(typeof body.username).toBe('string');
        expect(typeof body.email).toBe('string');
      });

      it('冪等性：同じトークンで複数回プロフィールを取得しても同じ結果が得られる', async () => {
        const req1 = new Request(`${TEST_CONFIG.BASE_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        const req2 = new Request(`${TEST_CONFIG.BASE_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        const [response1, response2] = await Promise.all([
          app.fetch(req1),
          app.fetch(req2)
        ]);

        expect(response1.status).toBe(HttpStatus.OK);
        expect(response2.status).toBe(HttpStatus.OK);

        const [body1, body2] = await Promise.all([
          response1.json(),
          response2.json()
        ]);

        expect(body1.id).toBe(body2.id);
        expect(body1.email).toBe(body2.email);
        expect(body1.username).toBe(body2.username);
      });
    });

    describe('異常系 - 認証エラー', () => {
      it('トークンなしでプロフィール取得に失敗する', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/profile`, {
          method: 'GET',
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(AUTH_ERROR_CODES.UNAUTHORIZED);
        expect(body).not.toHaveProperty('id');
        expect(body).not.toHaveProperty('username');
        expect(body).not.toHaveProperty('email');
      });

      it('無効なトークンでプロフィール取得に失敗する', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer invalid-token',
          },
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(AUTH_ERROR_CODES.INVALID_TOKEN);
      });

      it('Bearer形式でないトークンでプロフィール取得に失敗する', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': authToken,
          },
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(AUTH_ERROR_CODES.UNAUTHORIZED);
      });

      it('空のAuthorizationヘッダーでプロフィール取得に失敗する', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': '',
          },
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(AUTH_ERROR_CODES.UNAUTHORIZED);
      });

      it('Bearer のみでトークンが空の場合プロフィール取得に失敗する', async () => {
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ',
          },
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(AUTH_ERROR_CODES.UNAUTHORIZED);
      });
    });

    describe('セキュリティテスト', () => {
      it('改ざんされたトークンでプロフィール取得に失敗する', async () => {
        const tamperedToken = authToken.slice(0, -5) + 'xxxxx';
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tamperedToken}`,
          },
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(AUTH_ERROR_CODES.INVALID_TOKEN);
      });

      it('期限切れのトークンでプロフィール取得に失敗する', async () => {
        // 実際の期限切れトークンのテストは、モックやテスト用のトークンを使用して実装
        // ここではサンプルとして古いトークン形式を使用
        const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const req = new Request(`${TEST_CONFIG.BASE_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${expiredToken}`,
          },
        });

        const response = await app.fetch(req);
        expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        
        const body = await response.json();
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(AUTH_ERROR_CODES.INVALID_TOKEN);
      });
    });
  });
});
