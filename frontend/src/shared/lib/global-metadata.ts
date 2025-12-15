import type { Metadata } from 'next';

/**
 * 環境に応じたメタデータを生成
 */
export function generateMetadata(): Metadata {
  const environment = process.env.NODE_ENV;

  if (environment === 'development') {
    return {
      title: 'DEV - Archaive Maker',
      description: 'This is development mode',
      robots: 'noindex, nofollow',
    };
  }

  if (environment === 'test') {
    return {
      title: 'TEST - Archaive Maker',
      description: 'test environment',
      robots: 'noindex',
    };
  }

  return {
    title: 'Archaive Maker',
    description: 'Archaive Maker - Document Archive Solution',
    robots: 'index, follow',
  };
}

/**
 * 公開ページ用のメタデータを生成（アイコン付き）
 */
export function generatePublicMetadata(): Metadata {
  const baseMetadata = generateMetadata();

  return {
    ...baseMetadata,
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
    },
  };
}

/**
 * 認証済みユーザー用のメタデータを生成（アイコン付き）
 */
export function generateAuthenticatedMetadata(): Metadata {
  const baseMetadata = generateMetadata();

  return {
    ...baseMetadata,
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
    },
  };
}
