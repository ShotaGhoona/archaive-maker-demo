// ============================================
// 帳票ダミーデータ（後で削除）
// ============================================

/** 帳票カテゴリ */
export type DocumentCategory = "product" | "company";

/** 帳票種別 */
export interface DocumentType {
  id: string;
  name: string;
  description: string;
  category: DocumentCategory;
}

// ============================================
// 帳票種別マスタ
// ============================================

export const documentTypes: DocumentType[] = [
  // 製品に紐づく帳票
  {
    id: "product-spec",
    name: "製品仕様書",
    description: "製品の仕様・性能を記載した文書",
    category: "product",
  },
  {
    id: "bom",
    name: "部品表（BOM）",
    description: "製品を構成する部品の一覧",
    category: "product",
  },
  {
    id: "manufacturing-order",
    name: "製造指示書",
    description: "製造現場への作業指示書",
    category: "product",
  },
  {
    id: "inspection-report",
    name: "検査成績書",
    description: "製品の検査結果を記録した文書",
    category: "product",
  },
  {
    id: "shipping-inspection",
    name: "出荷検査表",
    description: "出荷前の最終検査結果",
    category: "product",
  },
  {
    id: "packing-spec",
    name: "梱包仕様書",
    description: "梱包方法・資材の指示書",
    category: "product",
  },
  {
    id: "assembly-manual",
    name: "組立手順書",
    description: "製品の組立手順を記載した文書",
    category: "product",
  },
  {
    id: "drawing",
    name: "図面",
    description: "製品・部品の図面",
    category: "product",
  },

  // 会社に紐づく帳票
  {
    id: "quotation",
    name: "見積書",
    description: "見積金額を提示する文書",
    category: "company",
  },
  {
    id: "purchase-order",
    name: "発注書",
    description: "部品や材料を発注する文書",
    category: "company",
  },
  {
    id: "order-confirmation",
    name: "注文請書",
    description: "注文の受諾を確認する文書",
    category: "company",
  },
  {
    id: "delivery-note",
    name: "納品書",
    description: "納品時に添付する文書",
    category: "company",
  },
  {
    id: "invoice",
    name: "請求書",
    description: "代金を請求する文書",
    category: "company",
  },
  {
    id: "acceptance-note",
    name: "検収書",
    description: "検収完了を確認する文書",
    category: "company",
  },
  {
    id: "basic-contract",
    name: "取引基本契約書",
    description: "取引条件を取り決める契約書",
    category: "company",
  },
];

// ============================================
// 帳票種別IDから帳票種別を取得
// ============================================

export function getDocumentTypeById(typeId: string): DocumentType | undefined {
  return documentTypes.find((t) => t.id === typeId);
}

// ============================================
// 各帳票種別ごとのデータ型とダミーデータ
// ============================================

// --- 製品仕様書 ---
export interface ProductSpec {
  id: string;
  documentNumber: string;
  productCode: string;
  productName: string;
  version: string;
  status: "draft" | "review" | "approved" | "obsolete";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const dummyProductSpecs: ProductSpec[] = [
  {
    id: "ps-001",
    documentNumber: "PS-2024-001",
    productCode: "A100",
    productName: "電動モーターユニット A100",
    version: "3.0",
    status: "approved",
    createdBy: "山田太郎",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-20",
  },
  {
    id: "ps-002",
    documentNumber: "PS-2024-002",
    productCode: "CB-500",
    productName: "制御基板 CB-500",
    version: "2.1",
    status: "review",
    createdBy: "佐藤花子",
    createdAt: "2024-02-10",
    updatedAt: "2024-04-05",
  },
  {
    id: "ps-003",
    documentNumber: "PS-2024-003",
    productCode: "SM-200",
    productName: "センサーモジュール SM-200",
    version: "1.0",
    status: "draft",
    createdBy: "鈴木一郎",
    createdAt: "2024-04-01",
    updatedAt: "2024-04-10",
  },
];

// --- 部品表（BOM） ---
export interface BOM {
  id: string;
  documentNumber: string;
  productCode: string;
  productName: string;
  totalParts: number;
  totalCost: number;
  version: string;
  status: "draft" | "review" | "approved" | "obsolete";
  createdBy: string;
  updatedAt: string;
}

export const dummyBOMs: BOM[] = [
  {
    id: "bom-001",
    documentNumber: "BOM-2024-001",
    productCode: "A100",
    productName: "電動モーターユニット A100",
    totalParts: 48,
    totalCost: 12500,
    version: "5.0",
    status: "approved",
    createdBy: "山田太郎",
    updatedAt: "2024-03-25",
  },
  {
    id: "bom-002",
    documentNumber: "BOM-2024-002",
    productCode: "CB-500",
    productName: "制御基板 CB-500",
    totalParts: 125,
    totalCost: 8200,
    version: "3.2",
    status: "approved",
    createdBy: "佐藤花子",
    updatedAt: "2024-04-01",
  },
  {
    id: "bom-003",
    documentNumber: "BOM-2024-003",
    productCode: "SM-200",
    productName: "センサーモジュール SM-200",
    totalParts: 32,
    totalCost: 4500,
    version: "1.0",
    status: "draft",
    createdBy: "鈴木一郎",
    updatedAt: "2024-04-10",
  },
];

// --- 製造指示書 ---
export interface ManufacturingOrder {
  id: string;
  orderNumber: string;
  productCode: string;
  productName: string;
  quantity: number;
  unit: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  assignedTo: string;
  createdAt: string;
}

export const dummyManufacturingOrders: ManufacturingOrder[] = [
  {
    id: "mo-001",
    orderNumber: "MO-2024-015",
    productCode: "A100",
    productName: "電動モーターユニット A100",
    quantity: 100,
    unit: "台",
    dueDate: "2024-05-15",
    priority: "high",
    status: "in_progress",
    assignedTo: "製造1課",
    createdAt: "2024-04-01",
  },
  {
    id: "mo-002",
    orderNumber: "MO-2024-016",
    productCode: "CB-500",
    productName: "制御基板 CB-500",
    quantity: 500,
    unit: "枚",
    dueDate: "2024-05-20",
    priority: "medium",
    status: "pending",
    assignedTo: "製造2課",
    createdAt: "2024-04-05",
  },
  {
    id: "mo-003",
    orderNumber: "MO-2024-017",
    productCode: "SM-200",
    productName: "センサーモジュール SM-200",
    quantity: 200,
    unit: "個",
    dueDate: "2024-04-30",
    priority: "high",
    status: "completed",
    assignedTo: "製造1課",
    createdAt: "2024-03-20",
  },
];

// --- 検査成績書 ---
export interface InspectionReport {
  id: string;
  reportNumber: string;
  productCode: string;
  productName: string;
  lotNumber: string;
  inspectionDate: string;
  inspector: string;
  result: "pass" | "fail" | "conditional";
  defectRate: number;
  remarks: string;
}

export const dummyInspectionReports: InspectionReport[] = [
  {
    id: "ir-001",
    reportNumber: "IR-2024-001",
    productCode: "A100",
    productName: "電動モーターユニット A100",
    lotNumber: "LOT-2024-0315",
    inspectionDate: "2024-03-15",
    inspector: "品質管理課 田中",
    result: "pass",
    defectRate: 0.5,
    remarks: "",
  },
  {
    id: "ir-002",
    reportNumber: "IR-2024-002",
    productCode: "CB-500",
    productName: "制御基板 CB-500",
    lotNumber: "LOT-2024-0401",
    inspectionDate: "2024-04-01",
    inspector: "品質管理課 佐々木",
    result: "conditional",
    defectRate: 2.1,
    remarks: "軽微な外観不良あり、出荷可",
  },
  {
    id: "ir-003",
    reportNumber: "IR-2024-003",
    productCode: "SM-200",
    productName: "センサーモジュール SM-200",
    lotNumber: "LOT-2024-0408",
    inspectionDate: "2024-04-08",
    inspector: "品質管理課 田中",
    result: "pass",
    defectRate: 0.0,
    remarks: "",
  },
];

// --- 見積書 ---
export interface Quotation {
  id: string;
  quotationNumber: string;
  customerCode: string;
  customerName: string;
  subject: string;
  totalAmount: number;
  validUntil: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  createdBy: string;
  createdAt: string;
}

export const dummyQuotations: Quotation[] = [
  {
    id: "qt-001",
    quotationNumber: "QT-2024-042",
    customerCode: "C001",
    customerName: "株式会社ABC工業",
    subject: "電動モーターユニット A100 100台",
    totalAmount: 1500000,
    validUntil: "2024-05-08",
    status: "sent",
    createdBy: "営業部 高橋",
    createdAt: "2024-04-08",
  },
  {
    id: "qt-002",
    quotationNumber: "QT-2024-043",
    customerCode: "C002",
    customerName: "東西電機株式会社",
    subject: "制御基板 CB-500 500枚",
    totalAmount: 4500000,
    validUntil: "2024-05-15",
    status: "accepted",
    createdBy: "営業部 高橋",
    createdAt: "2024-04-05",
  },
  {
    id: "qt-003",
    quotationNumber: "QT-2024-044",
    customerCode: "C003",
    customerName: "南北精機株式会社",
    subject: "センサーモジュール SM-200 1000個",
    totalAmount: 5000000,
    validUntil: "2024-04-20",
    status: "expired",
    createdBy: "営業部 山本",
    createdAt: "2024-03-20",
  },
];

// --- 発注書 ---
export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierCode: string;
  supplierName: string;
  subject: string;
  totalAmount: number;
  deliveryDate: string;
  status: "draft" | "ordered" | "partial" | "received" | "cancelled";
  orderedBy: string;
  orderedAt: string;
}

export const dummyPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po-001",
    orderNumber: "PO-2024-088",
    supplierCode: "S001",
    supplierName: "部品商事株式会社",
    subject: "コンデンサ 0.1μF 10000個",
    totalAmount: 50000,
    deliveryDate: "2024-04-20",
    status: "ordered",
    orderedBy: "購買部 渡辺",
    orderedAt: "2024-04-10",
  },
  {
    id: "po-002",
    orderNumber: "PO-2024-089",
    supplierCode: "S002",
    supplierName: "金属加工株式会社",
    subject: "アルミフレーム A100用 200個",
    totalAmount: 320000,
    deliveryDate: "2024-04-25",
    status: "partial",
    orderedBy: "購買部 渡辺",
    orderedAt: "2024-04-11",
  },
  {
    id: "po-003",
    orderNumber: "PO-2024-090",
    supplierCode: "S003",
    supplierName: "電子部品センター",
    subject: "IC チップ各種",
    totalAmount: 180000,
    deliveryDate: "2024-04-18",
    status: "received",
    orderedBy: "購買部 斎藤",
    orderedAt: "2024-04-05",
  },
];

// --- 納品書 ---
export interface DeliveryNote {
  id: string;
  deliveryNumber: string;
  customerCode: string;
  customerName: string;
  productName: string;
  quantity: number;
  unit: string;
  deliveryDate: string;
  receivedBy: string;
  status: "preparing" | "shipped" | "delivered";
}

export const dummyDeliveryNotes: DeliveryNote[] = [
  {
    id: "dn-001",
    deliveryNumber: "DN-2024-056",
    customerCode: "C001",
    customerName: "株式会社ABC工業",
    productName: "電動モーターユニット A100",
    quantity: 50,
    unit: "台",
    deliveryDate: "2024-04-12",
    receivedBy: "倉庫担当 伊藤様",
    status: "delivered",
  },
  {
    id: "dn-002",
    deliveryNumber: "DN-2024-057",
    customerCode: "C002",
    customerName: "東西電機株式会社",
    productName: "制御基板 CB-500",
    quantity: 250,
    unit: "枚",
    deliveryDate: "2024-04-15",
    receivedBy: "",
    status: "shipped",
  },
  {
    id: "dn-003",
    deliveryNumber: "DN-2024-058",
    customerCode: "C001",
    customerName: "株式会社ABC工業",
    productName: "電動モーターユニット A100",
    quantity: 50,
    unit: "台",
    deliveryDate: "2024-04-20",
    receivedBy: "",
    status: "preparing",
  },
];

// --- 請求書 ---
export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerCode: string;
  customerName: string;
  billingPeriod: string;
  totalAmount: number;
  taxAmount: number;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue";
  createdBy: string;
  createdAt: string;
}

export const dummyInvoices: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "INV-2024-041",
    customerCode: "C001",
    customerName: "株式会社ABC工業",
    billingPeriod: "2024年4月",
    totalAmount: 825000,
    taxAmount: 75000,
    dueDate: "2024-05-31",
    status: "sent",
    createdBy: "経理部 小林",
    createdAt: "2024-04-15",
  },
  {
    id: "inv-002",
    invoiceNumber: "INV-2024-040",
    customerCode: "C002",
    customerName: "東西電機株式会社",
    billingPeriod: "2024年3月",
    totalAmount: 2200000,
    taxAmount: 200000,
    dueDate: "2024-04-30",
    status: "paid",
    createdBy: "経理部 小林",
    createdAt: "2024-03-31",
  },
  {
    id: "inv-003",
    invoiceNumber: "INV-2024-038",
    customerCode: "C003",
    customerName: "南北精機株式会社",
    billingPeriod: "2024年2月",
    totalAmount: 550000,
    taxAmount: 50000,
    dueDate: "2024-03-31",
    status: "overdue",
    createdBy: "経理部 小林",
    createdAt: "2024-02-28",
  },
];

// --- 出荷検査表 ---
export interface ShippingInspection {
  id: string;
  inspectionNumber: string;
  productCode: string;
  productName: string;
  lotNumber: string;
  quantity: number;
  unit: string;
  inspectionDate: string;
  inspector: string;
  result: "pass" | "fail" | "conditional";
  shippingDestination: string;
}

export const dummyShippingInspections: ShippingInspection[] = [
  {
    id: "si-001",
    inspectionNumber: "SI-2024-001",
    productCode: "A100",
    productName: "電動モーターユニット A100",
    lotNumber: "LOT-2024-0410",
    quantity: 50,
    unit: "台",
    inspectionDate: "2024-04-10",
    inspector: "品質管理課 田中",
    result: "pass",
    shippingDestination: "株式会社ABC工業",
  },
  {
    id: "si-002",
    inspectionNumber: "SI-2024-002",
    productCode: "CB-500",
    productName: "制御基板 CB-500",
    lotNumber: "LOT-2024-0412",
    quantity: 250,
    unit: "枚",
    inspectionDate: "2024-04-12",
    inspector: "品質管理課 佐々木",
    result: "pass",
    shippingDestination: "東西電機株式会社",
  },
  {
    id: "si-003",
    inspectionNumber: "SI-2024-003",
    productCode: "SM-200",
    productName: "センサーモジュール SM-200",
    lotNumber: "LOT-2024-0415",
    quantity: 100,
    unit: "個",
    inspectionDate: "2024-04-15",
    inspector: "品質管理課 田中",
    result: "conditional",
    shippingDestination: "南北精機株式会社",
  },
];

// --- 梱包仕様書 ---
export interface PackingSpec {
  id: string;
  documentNumber: string;
  productCode: string;
  productName: string;
  packingType: string;
  boxSize: string;
  weight: number;
  version: string;
  status: "draft" | "review" | "approved" | "obsolete";
  createdBy: string;
  updatedAt: string;
}

export const dummyPackingSpecs: PackingSpec[] = [
  {
    id: "pkg-001",
    documentNumber: "PKG-2024-001",
    productCode: "A100",
    productName: "電動モーターユニット A100",
    packingType: "段ボール箱（緩衝材入り）",
    boxSize: "500x400x300mm",
    weight: 8.5,
    version: "2.0",
    status: "approved",
    createdBy: "物流部 木村",
    updatedAt: "2024-02-15",
  },
  {
    id: "pkg-002",
    documentNumber: "PKG-2024-002",
    productCode: "CB-500",
    productName: "制御基板 CB-500",
    packingType: "静電防止袋（トレイ梱包）",
    boxSize: "300x250x100mm",
    weight: 1.2,
    version: "1.0",
    status: "approved",
    createdBy: "物流部 木村",
    updatedAt: "2024-03-01",
  },
  {
    id: "pkg-003",
    documentNumber: "PKG-2024-003",
    productCode: "SM-200",
    productName: "センサーモジュール SM-200",
    packingType: "個装箱（10個入り）",
    boxSize: "200x150x80mm",
    weight: 0.5,
    version: "1.0",
    status: "draft",
    createdBy: "物流部 斎藤",
    updatedAt: "2024-04-05",
  },
];

// --- 組立手順書 ---
export interface AssemblyManual {
  id: string;
  documentNumber: string;
  productCode: string;
  productName: string;
  totalSteps: number;
  estimatedTime: number;
  difficulty: "easy" | "medium" | "hard";
  version: string;
  status: "draft" | "review" | "approved" | "obsolete";
  createdBy: string;
  updatedAt: string;
}

export const dummyAssemblyManuals: AssemblyManual[] = [
  {
    id: "am-001",
    documentNumber: "AM-2024-001",
    productCode: "A100",
    productName: "電動モーターユニット A100",
    totalSteps: 24,
    estimatedTime: 45,
    difficulty: "medium",
    version: "3.0",
    status: "approved",
    createdBy: "製造技術課 中村",
    updatedAt: "2024-03-10",
  },
  {
    id: "am-002",
    documentNumber: "AM-2024-002",
    productCode: "CB-500",
    productName: "制御基板 CB-500",
    totalSteps: 8,
    estimatedTime: 15,
    difficulty: "easy",
    version: "2.0",
    status: "approved",
    createdBy: "製造技術課 中村",
    updatedAt: "2024-02-20",
  },
  {
    id: "am-003",
    documentNumber: "AM-2024-003",
    productCode: "SM-200",
    productName: "センサーモジュール SM-200",
    totalSteps: 12,
    estimatedTime: 20,
    difficulty: "easy",
    version: "1.0",
    status: "review",
    createdBy: "製造技術課 佐藤",
    updatedAt: "2024-04-08",
  },
];

// --- 図面 ---
export interface Drawing {
  id: string;
  drawingNumber: string;
  name: string;
  productCode: string;
  revision: string;
  scale: string;
  sheetSize: string;
  fileFormat: string;
  status: "draft" | "review" | "approved" | "obsolete";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const dummyDrawings: Drawing[] = [
  {
    id: "dwg-001",
    drawingNumber: "DWG-A100-001",
    name: "電動モーターユニット A100 組立図",
    productCode: "A100",
    revision: "C",
    scale: "1:2",
    sheetSize: "A1",
    fileFormat: "PDF",
    status: "approved",
    createdBy: "設計部 中村",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-28",
  },
  {
    id: "dwg-002",
    drawingNumber: "DWG-A100-002",
    name: "電動モーターユニット A100 部品図",
    productCode: "A100",
    revision: "B",
    scale: "1:1",
    sheetSize: "A2",
    fileFormat: "PDF",
    status: "approved",
    createdBy: "設計部 中村",
    createdAt: "2024-01-15",
    updatedAt: "2024-02-20",
  },
  {
    id: "dwg-003",
    drawingNumber: "DWG-SM200-001",
    name: "センサーモジュール SM-200 外形図",
    productCode: "SM-200",
    revision: "A",
    scale: "2:1",
    sheetSize: "A3",
    fileFormat: "DXF",
    status: "draft",
    createdBy: "設計部 佐藤",
    createdAt: "2024-04-05",
    updatedAt: "2024-04-08",
  },
];

// --- 注文請書 ---
export interface OrderConfirmation {
  id: string;
  confirmationNumber: string;
  orderNumber: string;
  customerCode: string;
  customerName: string;
  subject: string;
  totalAmount: number;
  deliveryDate: string;
  status: "draft" | "sent" | "acknowledged";
  createdBy: string;
  createdAt: string;
}

export const dummyOrderConfirmations: OrderConfirmation[] = [
  {
    id: "oc-001",
    confirmationNumber: "OC-2024-025",
    orderNumber: "ORD-2024-042",
    customerCode: "C001",
    customerName: "株式会社ABC工業",
    subject: "電動モーターユニット A100 100台",
    totalAmount: 1500000,
    deliveryDate: "2024-05-15",
    status: "sent",
    createdBy: "営業部 高橋",
    createdAt: "2024-04-10",
  },
  {
    id: "oc-002",
    confirmationNumber: "OC-2024-026",
    orderNumber: "ORD-2024-043",
    customerCode: "C002",
    customerName: "東西電機株式会社",
    subject: "制御基板 CB-500 500枚",
    totalAmount: 4500000,
    deliveryDate: "2024-05-20",
    status: "acknowledged",
    createdBy: "営業部 高橋",
    createdAt: "2024-04-08",
  },
  {
    id: "oc-003",
    confirmationNumber: "OC-2024-027",
    orderNumber: "ORD-2024-044",
    customerCode: "C003",
    customerName: "南北精機株式会社",
    subject: "センサーモジュール SM-200 200個",
    totalAmount: 1000000,
    deliveryDate: "2024-04-30",
    status: "draft",
    createdBy: "営業部 山本",
    createdAt: "2024-04-12",
  },
];

// --- 検収書 ---
export interface AcceptanceNote {
  id: string;
  acceptanceNumber: string;
  deliveryNumber: string;
  supplierCode: string;
  supplierName: string;
  subject: string;
  quantity: number;
  unit: string;
  acceptanceDate: string;
  result: "accepted" | "partial" | "rejected";
  inspector: string;
  remarks: string;
}

export const dummyAcceptanceNotes: AcceptanceNote[] = [
  {
    id: "an-001",
    acceptanceNumber: "AN-2024-045",
    deliveryNumber: "SDN-2024-088",
    supplierCode: "S001",
    supplierName: "部品商事株式会社",
    subject: "コンデンサ 0.1μF",
    quantity: 10000,
    unit: "個",
    acceptanceDate: "2024-04-20",
    result: "accepted",
    inspector: "購買部 渡辺",
    remarks: "",
  },
  {
    id: "an-002",
    acceptanceNumber: "AN-2024-046",
    deliveryNumber: "SDN-2024-089",
    supplierCode: "S002",
    supplierName: "金属加工株式会社",
    subject: "アルミフレーム A100用",
    quantity: 100,
    unit: "個",
    acceptanceDate: "2024-04-22",
    result: "partial",
    inspector: "購買部 渡辺",
    remarks: "100個中5個に傷あり、代品手配中",
  },
  {
    id: "an-003",
    acceptanceNumber: "AN-2024-047",
    deliveryNumber: "SDN-2024-090",
    supplierCode: "S003",
    supplierName: "電子部品センター",
    subject: "IC チップ MC7805",
    quantity: 500,
    unit: "個",
    acceptanceDate: "2024-04-18",
    result: "accepted",
    inspector: "購買部 斎藤",
    remarks: "",
  },
];

// --- 取引基本契約書 ---
export interface BasicContract {
  id: string;
  contractNumber: string;
  partnerCode: string;
  partnerName: string;
  contractType: "sales" | "purchase" | "nda" | "other";
  startDate: string;
  endDate: string;
  autoRenewal: boolean;
  status: "draft" | "negotiating" | "active" | "expired" | "terminated";
  createdBy: string;
  createdAt: string;
}

export const dummyBasicContracts: BasicContract[] = [
  {
    id: "bc-001",
    contractNumber: "BC-2024-001",
    partnerCode: "C001",
    partnerName: "株式会社ABC工業",
    contractType: "sales",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    autoRenewal: true,
    status: "active",
    createdBy: "総務部 斎藤",
    createdAt: "2023-12-15",
  },
  {
    id: "bc-002",
    contractNumber: "BC-2024-002",
    partnerCode: "S001",
    partnerName: "部品商事株式会社",
    contractType: "purchase",
    startDate: "2024-04-01",
    endDate: "2026-03-31",
    autoRenewal: true,
    status: "active",
    createdBy: "総務部 斎藤",
    createdAt: "2024-03-20",
  },
  {
    id: "bc-003",
    contractNumber: "BC-2024-003",
    partnerCode: "C003",
    partnerName: "南北精機株式会社",
    contractType: "nda",
    startDate: "2024-02-01",
    endDate: "2027-01-31",
    autoRenewal: false,
    status: "active",
    createdBy: "総務部 木村",
    createdAt: "2024-01-25",
  },
];

// ============================================
// 帳票種別ごとのデータ取得
// ============================================

export function getDocumentDataByTypeId(typeId: string) {
  switch (typeId) {
    case "product-spec":
      return dummyProductSpecs;
    case "bom":
      return dummyBOMs;
    case "manufacturing-order":
      return dummyManufacturingOrders;
    case "inspection-report":
      return dummyInspectionReports;
    case "shipping-inspection":
      return dummyShippingInspections;
    case "packing-spec":
      return dummyPackingSpecs;
    case "assembly-manual":
      return dummyAssemblyManuals;
    case "drawing":
      return dummyDrawings;
    case "quotation":
      return dummyQuotations;
    case "purchase-order":
      return dummyPurchaseOrders;
    case "order-confirmation":
      return dummyOrderConfirmations;
    case "delivery-note":
      return dummyDeliveryNotes;
    case "invoice":
      return dummyInvoices;
    case "acceptance-note":
      return dummyAcceptanceNotes;
    case "basic-contract":
      return dummyBasicContracts;
    default:
      return [];
  }
}
