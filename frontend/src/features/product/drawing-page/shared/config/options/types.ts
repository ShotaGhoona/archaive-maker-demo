/**
 * 選択肢オプション
 */
export interface SelectOption {
  label: string;
  value: string;
  color?: string;
}

/**
 * ユーザー選択肢
 */
export interface UserOption {
  id: string;
  name: string;
  avatarUrl?: string;
}
