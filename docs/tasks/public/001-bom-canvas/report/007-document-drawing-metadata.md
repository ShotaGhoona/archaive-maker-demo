# 007: feat: document drawing metadata

**コミットID**: `21d7b3280efb4025e6d766d79ee52df7f78015b6`
**日時**: 2025-12-29 18:17:57 +0900
**作者**: ShotaGhoona

## 概要

ドキュメント・図面プレビューダイアログにメタデータフィールドの動的レンダリング機能を追加。

## 変更内容

### 追加ファイル
- `shared/ui/form-fields/lib/render-dynamic-field.tsx` - 動的フィールドレンダリング関数

### 変更ファイル
- `widgets/bom/canvas/document-preview/ui/DocumentPreviewDialog.tsx` - メタデータ表示機能追加
- `widgets/bom/canvas/drawing-preview/ui/DrawingPreviewDialog.tsx` - メタデータ表示機能追加
- `widgets/bom/canvas/metadata-sheet/ui/MetadataSheet.tsx` - リファクタリング

### 変更規模
- 4ファイル変更
- +191行 / -70行

## 実装詳細

### render-dynamic-field.tsx
```typescript
// フィールドタイプに応じた動的レンダリング
export function renderDynamicField(field: FieldConfig, value: unknown) {
  switch (field.type) {
    case 'text':
      return <TextField value={value} />;
    case 'date':
      return <DateField value={value} />;
    case 'select':
      return <SelectField value={value} options={field.options} />;
    case 'number':
      return <NumberField value={value} />;
    case 'boolean':
      return <BooleanField value={value} />;
    // ... その他のタイプ
  }
}
```

### DocumentPreviewDialog.tsx の拡張
```typescript
// メタデータセクション追加
<div className="metadata-section">
  <h3>ドキュメント情報</h3>
  {fields.map(field => (
    <div key={field.key}>
      <label>{field.label}</label>
      {renderDynamicField(field, document[field.key])}
    </div>
  ))}
</div>
```

### DrawingPreviewDialog.tsx の拡張
```typescript
// 図面固有のメタデータ
- 図面番号
- リビジョン
- 作成日
- 承認者
- サイズ（A0〜A4）
- 材質
- 表面処理
```

## 設計意図
- フィールド定義とレンダリングロジックの分離
- 新しいフィールドタイプの追加が容易
- 一貫したUI/UXの提供
- MetadataSheetとの共通ロジックの抽出
