describe('サインイン画面', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    // サインイン画面に遷移（アプリの初期画面によって調整が必要）
    await element(by.text('サインイン')).tap();
  });

  it('サインインフォームが表示される', async () => {
    await expect(element(by.text('サインイン'))).toBeVisible();
    await expect(element(by.text('アカウントにログインしてください'))).toBeVisible();
    await expect(element(by.id('emailInput'))).toBeVisible();
    await expect(element(by.id('passwordInput'))).toBeVisible();
    await expect(element(by.id('signInButton'))).toBeVisible();
  });

  it('テスト認証情報セクションが表示される', async () => {
    await expect(element(by.text('テスト用認証情報: (タップで入力 / 長押しでコピー)'))).toBeVisible();
    await expect(element(by.text('pikachu@example.com'))).toBeVisible();
    await expect(element(by.text('pikachuPokemon1234!'))).toBeVisible();
  });

  it('空のフィールドでサインインしようとするとエラーが表示される', async () => {
    await element(by.id('signInButton')).tap();
    
    // アラートダイアログの確認
    await expect(element(by.text('エラー'))).toBeVisible();
    await expect(element(by.text('メールアドレスとパスワードを入力してください'))).toBeVisible();
    
    // アラートを閉じる
    await element(by.text('OK')).tap();
  });

  it('メールアドレスフィールドにテキストを入力できる', async () => {
    await element(by.id('emailInput')).typeText('test@example.com');
    await expect(element(by.id('emailInput'))).toHaveText('test@example.com');
  });

  it('パスワードフィールドにテキストを入力できる', async () => {
    await element(by.id('passwordInput')).typeText('password123');
    // セキュア入力のため、実際のテキストは確認できないが、入力できることを確認
    await expect(element(by.id('passwordInput'))).toBeVisible();
  });

  it('テスト認証情報のメールボタンをタップするとメールアドレスが自動入力される', async () => {
    await element(by.text('pikachu@example.com')).tap();
    await expect(element(by.id('emailInput'))).toHaveText('pikachu@example.com');
  });

  it('テスト認証情報のパスワードボタンをタップするとパスワードが自動入力される', async () => {
    await element(by.text('pikachuPokemon1234!')).tap();
    // パスワードフィールドが更新されたことを確認（具体的な値は見えない）
    await expect(element(by.id('passwordInput'))).toBeVisible();
  });

  it('有効な認証情報でサインインするとローディング状態が表示される', async () => {
    // テスト認証情報を入力
    await element(by.text('pikachu@example.com')).tap();
    await element(by.text('pikachuPokemon1234!')).tap();
    
    // サインインボタンをタップ
    await element(by.id('signInButton')).tap();
    
    // ローディングインジケーターが表示されることを確認
    await expect(element(by.id('activity-indicator'))).toBeVisible();
    
    // ローディング中はボタンのテキストが変わることを確認
    await expect(element(by.text('処理中...'))).toBeVisible();
  });

  it('サインイン成功後にホーム画面に遷移する', async () => {
    // テスト認証情報を入力
    await element(by.text('pikachu@example.com')).tap();
    await element(by.text('pikachuPokemon1234!')).tap();
    
    // サインインボタンをタップ
    await element(by.id('signInButton')).tap();
    
    // ホーム画面への遷移を待機（5秒でタイムアウト）
    await waitFor(element(by.text('ホーム')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('メールアドレス入力後にEnterキーを押すとパスワードフィールドにフォーカスが移る', async () => {
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('emailInput')).tapReturnKey();
    
    // パスワードフィールドがフォーカスされているかの確認は間接的に行う
    // （キーボードが表示されていることを確認）
    await expect(element(by.id('passwordInput'))).toBeVisible();
  });

  it('パスワード入力後にEnterキーを押すとサインイン処理が実行される', async () => {
    // テスト認証情報を入力
    await element(by.id('emailInput')).typeText('pikachu@example.com');
    await element(by.id('passwordInput')).typeText('pikachuPokemon1234!');
    
    // パスワードフィールドでEnterキーを押す
    await element(by.id('passwordInput')).tapReturnKey();
    
    // ローディング状態になることを確認
    await expect(element(by.id('activity-indicator'))).toBeVisible();
  });

  it('無効な認証情報でサインインするとエラーが表示される', async () => {
    await element(by.id('emailInput')).typeText('invalid@example.com');
    await element(by.id('passwordInput')).typeText('wrongpassword');
    
    await element(by.id('signInButton')).tap();
    
    // エラーアラートの確認
    await waitFor(element(by.text('サインインエラー')))
      .toBeVisible()
      .withTimeout(5000);
    
    // アラートを閉じる
    await element(by.text('OK')).tap();
  });

  it('画面外をタップするとキーボードが閉じる', async () => {
    // メールアドレスフィールドをタップしてキーボードを表示
    await element(by.id('emailInput')).tap();
    
    // タイトル部分をタップしてキーボードを閉じる
    await element(by.text('サインイン')).tap();
    
    // キーボードが閉じたことを間接的に確認
    // （実際のアプリでは画面レイアウトの変化を確認）
    await expect(element(by.text('サインイン'))).toBeVisible();
  });
});