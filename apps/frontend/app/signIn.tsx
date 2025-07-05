import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from 'react-native';
// Clipboardライブラリのエラーを回避し、手動選択コピーに変更
import { router } from 'expo-router';

import { Colors, Typography, Spacing } from '../src/constants/design';
import { ThemedButton } from '../src/components/ThemedButton';
import { signIn } from '../src/api/auth';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // TextInputのrefを作成してフォーカス制御に使用
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください');
      return;
    }

    // キーボードを閉じる
    Keyboard.dismiss();
    
    setIsLoading(true);
    try {
      const response = await signIn({ email, password });
      
      // TODO: トークンを AsyncStorage に保存
      console.log('サインイン成功:', response);
      
      // ホーム画面に遷移
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('サインインエラー', error instanceof Error ? error.message : 'サインインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  // 画面タップでキーボードを閉じる
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Enterキー押下時の処理
  const handleEmailSubmitEditing = () => {
    passwordInputRef.current?.focus();
  };

  const handlePasswordSubmitEditing = () => {
    handleSignIn();
  };

  // テスト認証情報を入力フィールドに直接設定する関数
  const setTestCredentials = (type: 'email' | 'password') => {
    if (type === 'email') {
      setEmail(testEmail);
    } else {
      setPassword(testPassword);
    }
  };

  // テスト認証情報の値
  const testEmail = 'pikachu@example.com';
  const testPassword = 'pikachuPokemon1234!';

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="always"
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.content}>
            <Text style={styles.title}>サインイン</Text>
            <Text style={styles.subtitle}>アカウントにログインしてください</Text>
            
            <View style={styles.form}>
              <TextInput
                testID="emailInput"
                ref={emailInputRef}
                style={styles.input}
                placeholder="メールアドレス"
                placeholderTextColor={Colors.dark.text.tertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
                onSubmitEditing={handleEmailSubmitEditing}
                onFocus={() => {
                  console.log('Email input focused');
                }}
              />
              
              <TextInput
                testID="passwordInput"
                ref={passwordInputRef}
                style={styles.input}
                placeholder="パスワード"
                placeholderTextColor={Colors.dark.text.tertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handlePasswordSubmitEditing}
                onFocus={() => {
                  console.log('Password input focused');
                }}
              />
              
              <ThemedButton
                testID="signInButton"
                title={isLoading ? '処理中...' : 'サインイン'}
                onPress={handleSignIn}
                disabled={isLoading}
                style={styles.signInButton}
              />
              
              {isLoading && (
                <ActivityIndicator 
                  testID="activity-indicator"
                  size="small" 
                  color={Colors.dark.pokemon.primary} 
                  style={styles.loader}
                />
              )}
            </View>
            
            <View style={styles.testCredentials}>
              <Text style={styles.testTitle}>テスト用認証情報: (タップで入力 / 長押しでコピー)</Text>
              
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={() => setTestCredentials('email')}
                activeOpacity={0.7}
              >
                <Text style={styles.copyLabel}>Email:</Text>
                <Text style={styles.copyValue} selectable={true}>{testEmail}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={() => setTestCredentials('password')}
                activeOpacity={0.7}
              >
                <Text style={styles.copyLabel}>Password:</Text>
                <Text style={styles.copyValue} selectable={true}>{testPassword}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing[6],
  },
  title: {
    ...Typography.title1,
    fontWeight: '600',
    color: Colors.dark.text.primary,
    marginBottom: Spacing[2],
  },
  subtitle: {
    ...Typography.subheadline,
    color: Colors.dark.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing[8],
  },
  form: {
    width: '100%',
    maxWidth: 300,
  },
  input: {
    height: 44,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.dark.border.primary,
    backgroundColor: Colors.dark.surface.primary,
    paddingHorizontal: Spacing[4],
    marginBottom: Spacing[4],
    fontSize: 16,
    color: Colors.dark.text.primary,
  },
  signInButton: {
    marginTop: Spacing[2],
  },
  loader: {
    marginTop: Spacing[4],
  },
  testCredentials: {
    marginTop: Spacing[8],
    padding: Spacing[4],
    backgroundColor: Colors.dark.surface.secondary,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.dark.border.secondary,
  },
  testTitle: {
    ...Typography.footnote,
    fontWeight: '600',
    color: Colors.dark.text.secondary,
    marginBottom: Spacing[3],
    textAlign: 'center',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    marginVertical: Spacing[1],
    backgroundColor: Colors.dark.surface.primary,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.dark.border.primary,
  },
  copyLabel: {
    ...Typography.caption1,
    fontWeight: '600',
    color: Colors.dark.text.secondary,
    marginRight: Spacing[2],
    minWidth: 60,
  },
  copyValue: {
    ...Typography.caption1,
    color: Colors.dark.text.tertiary,
    fontFamily: 'monospace',
    flex: 1,
  },
});