import bcrypt from 'bcryptjs';
import { writeFile, readFile } from 'fs/promises';

async function hashExistingPasswords() {
  try {
    // users.jsonを読み込み
    const usersData = await readFile('data/users.json', 'utf-8');
    const data = JSON.parse(usersData);

    // 各ユーザーのパスワードをハッシュ化
    for (const user of data.users) {
      if (user.password && !user.password.startsWith('$2a$')) {
        // パスワードがまだハッシュ化されていない場合
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;
        console.log(`User ${user.email} password hashed`);
      }
    }

    // ファイルに書き戻し
    await writeFile('data/users.json', JSON.stringify(data, null, 2));
    console.log('All passwords have been hashed successfully!');
  } catch (error) {
    console.error('Error hashing passwords:', error);
  }
}

hashExistingPasswords();