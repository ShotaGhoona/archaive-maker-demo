import type { FilterFieldConfig } from "@/widgets/common/filter/filter-sidebar/model/types";

// ============================================
// 共通フィルター項目
// ============================================

const commonUserOptions = [
  { id: "山田太郎", name: "山田太郎" },
  { id: "佐藤花子", name: "佐藤花子" },
  { id: "鈴木一郎", name: "鈴木一郎" },
  { id: "田中健太", name: "田中健太" },
  { id: "高橋美咲", name: "高橋美咲" },
  { id: "渡辺真理", name: "渡辺真理" },
  { id: "小林誠", name: "小林誠" },
];

const statusOptions = [
  { label: "下書き", value: "draft", color: "#6b7280" },
  { label: "レビュー中", value: "review", color: "#f59e0b" },
  { label: "承認済", value: "approved", color: "#22c55e" },
  { label: "廃止", value: "obsolete", color: "#ef4444" },
];

// ============================================
// 帳票種別ごとのフィルター設定
// ============================================

// 製品仕様書
const productSpecFilterFields: FilterFieldConfig[] = [
  { key: "documentNumber", label: "文書番号", type: "text", placeholder: "PS-2024-001" },
  { key: "productCode", label: "製品コード", type: "text", placeholder: "A100" },
  { key: "productName", label: "製品名", type: "text", placeholder: "製品名を入力" },
  { key: "version", label: "バージョン", type: "text", placeholder: "1.0" },
  { key: "status", label: "ステータス", type: "multiselect", options: statusOptions },
  { key: "createdBy", label: "作成者", type: "user", userOptions: commonUserOptions },
  { key: "createdAt", label: "作成日", type: "date" },
  { key: "updatedAt", label: "更新日", type: "date" },
];

// 部品表（BOM）
const bomFilterFields: FilterFieldConfig[] = [
  { key: "documentNumber", label: "文書番号", type: "text", placeholder: "BOM-2024-001" },
  { key: "productCode", label: "製品コード", type: "text", placeholder: "A100" },
  { key: "productName", label: "製品名", type: "text", placeholder: "製品名を入力" },
  { key: "version", label: "バージョン", type: "text", placeholder: "1.0" },
  { key: "status", label: "ステータス", type: "multiselect", options: statusOptions },
  { key: "createdBy", label: "作成者", type: "user", userOptions: commonUserOptions },
  { key: "updatedAt", label: "更新日", type: "date" },
];

// 製造指示書
const manufacturingOrderFilterFields: FilterFieldConfig[] = [
  { key: "orderNumber", label: "指示番号", type: "text", placeholder: "MO-2024-001" },
  { key: "productCode", label: "製品コード", type: "text", placeholder: "A100" },
  { key: "productName", label: "製品名", type: "text", placeholder: "製品名を入力" },
  {
    key: "priority",
    label: "優先度",
    type: "multiselect",
    options: [
      { label: "高", value: "high", color: "#ef4444" },
      { label: "中", value: "medium", color: "#f59e0b" },
      { label: "低", value: "low", color: "#22c55e" },
    ],
  },
  {
    key: "status",
    label: "ステータス",
    type: "multiselect",
    options: [
      { label: "保留", value: "pending", color: "#6b7280" },
      { label: "進行中", value: "in_progress", color: "#3b82f6" },
      { label: "完了", value: "completed", color: "#22c55e" },
      { label: "キャンセル", value: "cancelled", color: "#ef4444" },
    ],
  },
  { key: "assignedTo", label: "担当", type: "text", placeholder: "製造1課" },
  { key: "dueDate", label: "納期", type: "date" },
  { key: "createdAt", label: "作成日", type: "date" },
];

// 検査成績書
const inspectionReportFilterFields: FilterFieldConfig[] = [
  { key: "reportNumber", label: "報告書番号", type: "text", placeholder: "IR-2024-001" },
  { key: "productCode", label: "製品コード", type: "text", placeholder: "A100" },
  { key: "productName", label: "製品名", type: "text", placeholder: "製品名を入力" },
  { key: "lotNumber", label: "ロット番号", type: "text", placeholder: "LOT-2024-0001" },
  {
    key: "result",
    label: "結果",
    type: "multiselect",
    options: [
      { label: "合格", value: "pass", color: "#22c55e" },
      { label: "不合格", value: "fail", color: "#ef4444" },
      { label: "条件付き", value: "conditional", color: "#f59e0b" },
    ],
  },
  { key: "inspector", label: "検査者", type: "text", placeholder: "検査者名" },
  { key: "inspectionDate", label: "検査日", type: "date" },
];

// 見積書
const quotationFilterFields: FilterFieldConfig[] = [
  { key: "quotationNumber", label: "見積番号", type: "text", placeholder: "QT-2024-001" },
  { key: "customerCode", label: "顧客コード", type: "text", placeholder: "C001" },
  { key: "customerName", label: "顧客名", type: "text", placeholder: "顧客名を入力" },
  {
    key: "status",
    label: "ステータス",
    type: "multiselect",
    options: [
      { label: "下書き", value: "draft", color: "#6b7280" },
      { label: "送付済", value: "sent", color: "#3b82f6" },
      { label: "受注", value: "accepted", color: "#22c55e" },
      { label: "失注", value: "rejected", color: "#ef4444" },
      { label: "期限切れ", value: "expired", color: "#f59e0b" },
    ],
  },
  { key: "createdBy", label: "作成者", type: "user", userOptions: commonUserOptions },
  { key: "validUntil", label: "有効期限", type: "date" },
  { key: "createdAt", label: "作成日", type: "date" },
];

// 発注書
const purchaseOrderFilterFields: FilterFieldConfig[] = [
  { key: "orderNumber", label: "発注番号", type: "text", placeholder: "PO-2024-001" },
  { key: "supplierCode", label: "仕入先コード", type: "text", placeholder: "S001" },
  { key: "supplierName", label: "仕入先名", type: "text", placeholder: "仕入先名を入力" },
  {
    key: "status",
    label: "ステータス",
    type: "multiselect",
    options: [
      { label: "下書き", value: "draft", color: "#6b7280" },
      { label: "発注済", value: "ordered", color: "#3b82f6" },
      { label: "一部入荷", value: "partial", color: "#f59e0b" },
      { label: "入荷済", value: "received", color: "#22c55e" },
      { label: "キャンセル", value: "cancelled", color: "#ef4444" },
    ],
  },
  { key: "orderedBy", label: "発注者", type: "user", userOptions: commonUserOptions },
  { key: "deliveryDate", label: "納期", type: "date" },
  { key: "orderedAt", label: "発注日", type: "date" },
];

// 納品書
const deliveryNoteFilterFields: FilterFieldConfig[] = [
  { key: "deliveryNumber", label: "納品番号", type: "text", placeholder: "DN-2024-001" },
  { key: "customerCode", label: "顧客コード", type: "text", placeholder: "C001" },
  { key: "customerName", label: "顧客名", type: "text", placeholder: "顧客名を入力" },
  { key: "productName", label: "製品名", type: "text", placeholder: "製品名を入力" },
  {
    key: "status",
    label: "ステータス",
    type: "multiselect",
    options: [
      { label: "準備中", value: "preparing", color: "#6b7280" },
      { label: "出荷済", value: "shipped", color: "#3b82f6" },
      { label: "納品済", value: "delivered", color: "#22c55e" },
    ],
  },
  { key: "deliveryDate", label: "納品日", type: "date" },
];

// 請求書
const invoiceFilterFields: FilterFieldConfig[] = [
  { key: "invoiceNumber", label: "請求番号", type: "text", placeholder: "INV-2024-001" },
  { key: "customerCode", label: "顧客コード", type: "text", placeholder: "C001" },
  { key: "customerName", label: "顧客名", type: "text", placeholder: "顧客名を入力" },
  {
    key: "status",
    label: "ステータス",
    type: "multiselect",
    options: [
      { label: "下書き", value: "draft", color: "#6b7280" },
      { label: "送付済", value: "sent", color: "#3b82f6" },
      { label: "入金済", value: "paid", color: "#22c55e" },
      { label: "延滞", value: "overdue", color: "#ef4444" },
    ],
  },
  { key: "createdBy", label: "作成者", type: "user", userOptions: commonUserOptions },
  { key: "dueDate", label: "支払期限", type: "date" },
  { key: "createdAt", label: "作成日", type: "date" },
];

// 図面
const drawingFilterFields: FilterFieldConfig[] = [
  { key: "drawingNumber", label: "図面番号", type: "text", placeholder: "DWG-A100-001" },
  { key: "name", label: "図面名", type: "text", placeholder: "図面名を入力" },
  { key: "productCode", label: "製品コード", type: "text", placeholder: "A100" },
  { key: "revision", label: "リビジョン", type: "text", placeholder: "A" },
  { key: "status", label: "ステータス", type: "multiselect", options: statusOptions },
  { key: "createdBy", label: "作成者", type: "user", userOptions: commonUserOptions },
  { key: "createdAt", label: "作成日", type: "date" },
  { key: "updatedAt", label: "更新日", type: "date" },
];

// 汎用フィルター（その他の帳票種別用）
const defaultFilterFields: FilterFieldConfig[] = [
  { key: "documentNumber", label: "文書番号", type: "text", placeholder: "文書番号を入力" },
  { key: "status", label: "ステータス", type: "multiselect", options: statusOptions },
  { key: "createdBy", label: "作成者", type: "user", userOptions: commonUserOptions },
  { key: "createdAt", label: "作成日", type: "date" },
  { key: "updatedAt", label: "更新日", type: "date" },
];

// ============================================
// 帳票種別IDからフィルター設定を取得
// ============================================

export function getFilterFieldsByTypeId(typeId: string): FilterFieldConfig[] {
  switch (typeId) {
    case "product-spec":
      return productSpecFilterFields;
    case "bom":
      return bomFilterFields;
    case "manufacturing-order":
      return manufacturingOrderFilterFields;
    case "inspection-report":
      return inspectionReportFilterFields;
    case "quotation":
      return quotationFilterFields;
    case "purchase-order":
      return purchaseOrderFilterFields;
    case "delivery-note":
      return deliveryNoteFilterFields;
    case "invoice":
      return invoiceFilterFields;
    case "drawing":
      return drawingFilterFields;
    default:
      return defaultFilterFields;
  }
}

// ============================================
// 検索プレースホルダーを取得
// ============================================

export function getSearchPlaceholderByTypeId(typeId: string): string {
  switch (typeId) {
    case "product-spec":
      return "文書番号、製品コード、製品名で検索...";
    case "bom":
      return "文書番号、製品コード、製品名で検索...";
    case "manufacturing-order":
      return "指示番号、製品コード、製品名で検索...";
    case "inspection-report":
      return "報告書番号、製品コード、ロット番号で検索...";
    case "quotation":
      return "見積番号、顧客コード、顧客名で検索...";
    case "purchase-order":
      return "発注番号、仕入先コード、仕入先名で検索...";
    case "delivery-note":
      return "納品番号、顧客コード、製品名で検索...";
    case "invoice":
      return "請求番号、顧客コード、顧客名で検索...";
    case "drawing":
      return "図面番号、図面名、製品コードで検索...";
    default:
      return "キーワードで検索...";
  }
}
