import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/shadcn/ui/button";
import { Badge } from "@/shared/ui/shadcn/ui/badge";
import type { ColumnConfig } from "@/widgets/view/table-view/model/types";
import type {
  ProductSpec,
  BOM,
  ManufacturingOrder,
  InspectionReport,
  ShippingInspection,
  PackingSpec,
  AssemblyManual,
  Drawing,
  Quotation,
  PurchaseOrder,
  OrderConfirmation,
  DeliveryNote,
  Invoice,
  AcceptanceNote,
  BasicContract,
} from "../../../dummy-data/documents";

// ============================================
// 共通アクションカラム
// ============================================

function createOpenAction<T>(onOpen: (row: T) => void): ColumnConfig<T> {
  return {
    key: "actions-left",
    label: "",
    columnType: "actions",
    width: 100,
    sortable: false,
    sticky: "left",
    cellRenderer: (_, row) => (
      <Button
        variant="outline"
        size="lg"
        className="bg-card text-primary hover:bg-primary/10"
        onClick={(e) => {
          e.stopPropagation();
          onOpen(row);
        }}
      >
        <ExternalLink className="size-5" />
        開く
      </Button>
    ),
  };
}

function createDeleteAction<T>(onDelete: (row: T) => void): ColumnConfig<T> {
  return {
    key: "actions-right",
    label: "",
    columnType: "actions",
    width: 60,
    sortable: false,
    sticky: "right",
    cellRenderer: (_, row) => (
      <Button
        variant="outline"
        size="lg"
        className="bg-card text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(row);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    ),
  };
}

// ============================================
// ステータスバッジのレンダラー
// ============================================

const statusColors = {
  // ProductSpec, BOM
  draft: "bg-gray-100 text-gray-700",
  review: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  obsolete: "bg-red-100 text-red-700",
  // ManufacturingOrder
  pending: "bg-gray-100 text-gray-700",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  // InspectionReport
  pass: "bg-green-100 text-green-700",
  fail: "bg-red-100 text-red-700",
  conditional: "bg-yellow-100 text-yellow-700",
  // Quotation
  sent: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  expired: "bg-gray-100 text-gray-700",
  // PurchaseOrder
  ordered: "bg-blue-100 text-blue-700",
  partial: "bg-yellow-100 text-yellow-700",
  received: "bg-green-100 text-green-700",
  // DeliveryNote
  preparing: "bg-gray-100 text-gray-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  // Invoice
  paid: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
  // OrderConfirmation
  acknowledged: "bg-green-100 text-green-700",
  // BasicContract
  negotiating: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
  terminated: "bg-gray-100 text-gray-700",
} as const;

const statusLabels: Record<string, string> = {
  draft: "下書き",
  review: "レビュー中",
  approved: "承認済み",
  obsolete: "廃止",
  pending: "未着手",
  in_progress: "進行中",
  completed: "完了",
  cancelled: "キャンセル",
  pass: "合格",
  fail: "不合格",
  conditional: "条件付き",
  sent: "送付済み",
  accepted: "受注",
  rejected: "却下",
  expired: "期限切れ",
  ordered: "発注済み",
  partial: "一部",
  received: "納品完了",
  preparing: "準備中",
  shipped: "出荷済み",
  delivered: "納品済み",
  paid: "入金済み",
  overdue: "延滞",
  acknowledged: "確認済み",
  negotiating: "交渉中",
  active: "有効",
  terminated: "終了",
};

function renderStatus(value: string) {
  const color = statusColors[value as keyof typeof statusColors] || "bg-gray-100 text-gray-700";
  const label = statusLabels[value] || value;
  return (
    <Badge variant="outline" className={color}>
      {label}
    </Badge>
  );
}

// ============================================
// 製品仕様書カラム設定
// ============================================

export function createProductSpecColumns(
  onOpen: (row: ProductSpec) => void,
  onDelete: (row: ProductSpec) => void
): ColumnConfig<ProductSpec>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "documentNumber",
      label: "文書番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "productCode",
      label: "製品コード",
      columnType: "text",
      width: 120,
      sortable: true,
    },
    {
      key: "productName",
      label: "製品名",
      columnType: "text",
      width: 220,
      sortable: true,
    },
    {
      key: "version",
      label: "Ver",
      columnType: "text",
      width: 60,
      sortable: true,
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 120,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "createdBy",
      label: "作成者",
      columnType: "text",
      width: 100,
      sortable: true,
    },
    {
      key: "createdAt",
      label: "作成日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "updatedAt",
      label: "更新日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 部品表（BOM）カラム設定
// ============================================

export function createBOMColumns(
  onOpen: (row: BOM) => void,
  onDelete: (row: BOM) => void
): ColumnConfig<BOM>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "documentNumber",
      label: "文書番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "productCode",
      label: "製品コード",
      columnType: "text",
      width: 120,
      sortable: true,
    },
    {
      key: "productName",
      label: "製品名",
      columnType: "text",
      width: 220,
      sortable: true,
    },
    {
      key: "totalParts",
      label: "部品数",
      columnType: "text",
      width: 80,
      sortable: true,
    },
    {
      key: "totalCost",
      label: "原価",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => `¥${(value as number).toLocaleString()}`,
    },
    {
      key: "version",
      label: "Ver",
      columnType: "text",
      width: 60,
      sortable: true,
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 120,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "createdBy",
      label: "作成者",
      columnType: "text",
      width: 100,
      sortable: true,
    },
    {
      key: "updatedAt",
      label: "更新日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 製造指示書カラム設定
// ============================================

export function createManufacturingOrderColumns(
  onOpen: (row: ManufacturingOrder) => void,
  onDelete: (row: ManufacturingOrder) => void
): ColumnConfig<ManufacturingOrder>[] {
  const priorityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-gray-100 text-gray-700",
  };
  const priorityLabels = { high: "高", medium: "中", low: "低" };

  return [
    createOpenAction(onOpen),
    {
      key: "orderNumber",
      label: "指示番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "productCode",
      label: "製品コード",
      columnType: "text",
      width: 120,
      sortable: true,
    },
    {
      key: "productName",
      label: "製品名",
      columnType: "text",
      width: 200,
      sortable: true,
    },
    {
      key: "quantity",
      label: "数量",
      columnType: "text",
      width: 80,
      sortable: true,
      cellRenderer: (value, row) => `${value} ${row.unit}`,
    },
    {
      key: "dueDate",
      label: "納期",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "priority",
      label: "優先度",
      columnType: "text",
      width: 80,
      sortable: true,
      cellRenderer: (value) => (
        <Badge
          variant="outline"
          className={priorityColors[value as keyof typeof priorityColors]}
        >
          {priorityLabels[value as keyof typeof priorityLabels]}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "assignedTo",
      label: "担当",
      columnType: "text",
      width: 100,
      sortable: true,
    },
    {
      key: "createdAt",
      label: "作成日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 検査成績書カラム設定
// ============================================

export function createInspectionReportColumns(
  onOpen: (row: InspectionReport) => void,
  onDelete: (row: InspectionReport) => void
): ColumnConfig<InspectionReport>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "reportNumber",
      label: "報告書番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "productCode",
      label: "製品コード",
      columnType: "text",
      width: 120,
      sortable: true,
    },
    {
      key: "productName",
      label: "製品名",
      columnType: "text",
      width: 200,
      sortable: true,
    },
    {
      key: "lotNumber",
      label: "ロット番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "inspectionDate",
      label: "検査日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "result",
      label: "結果",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "defectRate",
      label: "不良率",
      columnType: "text",
      width: 80,
      sortable: true,
      cellRenderer: (value) => `${value}%`,
    },
    {
      key: "inspector",
      label: "検査者",
      columnType: "text",
      width: 130,
      sortable: true,
    },
    {
      key: "remarks",
      label: "備考",
      columnType: "text",
      width: 200,
      sortable: false,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 見積書カラム設定
// ============================================

export function createQuotationColumns(
  onOpen: (row: Quotation) => void,
  onDelete: (row: Quotation) => void
): ColumnConfig<Quotation>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "quotationNumber",
      label: "見積番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "customerCode",
      label: "顧客コード",
      columnType: "text",
      width: 100,
      sortable: true,
    },
    {
      key: "customerName",
      label: "顧客名",
      columnType: "text",
      width: 180,
      sortable: true,
    },
    {
      key: "subject",
      label: "件名",
      columnType: "text",
      width: 250,
      sortable: true,
    },
    {
      key: "totalAmount",
      label: "金額",
      columnType: "text",
      width: 120,
      sortable: true,
      cellRenderer: (value) => `¥${(value as number).toLocaleString()}`,
    },
    {
      key: "validUntil",
      label: "有効期限",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "createdBy",
      label: "作成者",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "createdAt",
      label: "作成日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 発注書カラム設定
// ============================================

export function createPurchaseOrderColumns(
  onOpen: (row: PurchaseOrder) => void,
  onDelete: (row: PurchaseOrder) => void
): ColumnConfig<PurchaseOrder>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "orderNumber",
      label: "発注番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "supplierCode",
      label: "仕入先コード",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "supplierName",
      label: "仕入先名",
      columnType: "text",
      width: 180,
      sortable: true,
    },
    {
      key: "subject",
      label: "件名",
      columnType: "text",
      width: 220,
      sortable: true,
    },
    {
      key: "totalAmount",
      label: "金額",
      columnType: "text",
      width: 110,
      sortable: true,
      cellRenderer: (value) => `¥${(value as number).toLocaleString()}`,
    },
    {
      key: "deliveryDate",
      label: "納期",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "orderedBy",
      label: "発注者",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "orderedAt",
      label: "発注日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 納品書カラム設定
// ============================================

export function createDeliveryNoteColumns(
  onOpen: (row: DeliveryNote) => void,
  onDelete: (row: DeliveryNote) => void
): ColumnConfig<DeliveryNote>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "deliveryNumber",
      label: "納品番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "customerCode",
      label: "顧客コード",
      columnType: "text",
      width: 100,
      sortable: true,
    },
    {
      key: "customerName",
      label: "顧客名",
      columnType: "text",
      width: 180,
      sortable: true,
    },
    {
      key: "productName",
      label: "製品名",
      columnType: "text",
      width: 200,
      sortable: true,
    },
    {
      key: "quantity",
      label: "数量",
      columnType: "text",
      width: 80,
      sortable: true,
      cellRenderer: (value, row) => `${value} ${row.unit}`,
    },
    {
      key: "deliveryDate",
      label: "納品日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "receivedBy",
      label: "受領者",
      columnType: "text",
      width: 130,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 請求書カラム設定
// ============================================

export function createInvoiceColumns(
  onOpen: (row: Invoice) => void,
  onDelete: (row: Invoice) => void
): ColumnConfig<Invoice>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "invoiceNumber",
      label: "請求番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "customerCode",
      label: "顧客コード",
      columnType: "text",
      width: 100,
      sortable: true,
    },
    {
      key: "customerName",
      label: "顧客名",
      columnType: "text",
      width: 180,
      sortable: true,
    },
    {
      key: "billingPeriod",
      label: "請求期間",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "totalAmount",
      label: "請求額",
      columnType: "text",
      width: 120,
      sortable: true,
      cellRenderer: (value) => `¥${(value as number).toLocaleString()}`,
    },
    {
      key: "taxAmount",
      label: "消費税",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => `¥${(value as number).toLocaleString()}`,
    },
    {
      key: "dueDate",
      label: "支払期日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "createdBy",
      label: "作成者",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "createdAt",
      label: "作成日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 出荷検査表カラム設定
// ============================================

export function createShippingInspectionColumns(
  onOpen: (row: ShippingInspection) => void,
  onDelete: (row: ShippingInspection) => void
): ColumnConfig<ShippingInspection>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "inspectionNumber",
      label: "検査番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "productCode",
      label: "製品コード",
      columnType: "text",
      width: 120,
      sortable: true,
    },
    {
      key: "productName",
      label: "製品名",
      columnType: "text",
      width: 200,
      sortable: true,
    },
    {
      key: "lotNumber",
      label: "ロット番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "quantity",
      label: "数量",
      columnType: "text",
      width: 80,
      sortable: true,
      cellRenderer: (value, row) => `${value} ${row.unit}`,
    },
    {
      key: "inspectionDate",
      label: "検査日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "result",
      label: "結果",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "shippingDestination",
      label: "出荷先",
      columnType: "text",
      width: 180,
      sortable: true,
    },
    {
      key: "inspector",
      label: "検査者",
      columnType: "text",
      width: 130,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 梱包仕様書カラム設定
// ============================================

export function createPackingSpecColumns(
  onOpen: (row: PackingSpec) => void,
  onDelete: (row: PackingSpec) => void
): ColumnConfig<PackingSpec>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "documentNumber",
      label: "文書番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "productCode",
      label: "製品コード",
      columnType: "text",
      width: 120,
      sortable: true,
    },
    {
      key: "productName",
      label: "製品名",
      columnType: "text",
      width: 200,
      sortable: true,
    },
    {
      key: "packingType",
      label: "梱包タイプ",
      columnType: "text",
      width: 180,
      sortable: true,
    },
    {
      key: "boxSize",
      label: "箱サイズ",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "weight",
      label: "重量",
      columnType: "text",
      width: 80,
      sortable: true,
      cellRenderer: (value) => `${value}kg`,
    },
    {
      key: "version",
      label: "Ver",
      columnType: "text",
      width: 60,
      sortable: true,
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "createdBy",
      label: "作成者",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "updatedAt",
      label: "更新日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 組立手順書カラム設定
// ============================================

export function createAssemblyManualColumns(
  onOpen: (row: AssemblyManual) => void,
  onDelete: (row: AssemblyManual) => void
): ColumnConfig<AssemblyManual>[] {
  const difficultyColors = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };
  const difficultyLabels = { easy: "易", medium: "中", hard: "難" };

  return [
    createOpenAction(onOpen),
    {
      key: "documentNumber",
      label: "文書番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "productCode",
      label: "製品コード",
      columnType: "text",
      width: 120,
      sortable: true,
    },
    {
      key: "productName",
      label: "製品名",
      columnType: "text",
      width: 200,
      sortable: true,
    },
    {
      key: "totalSteps",
      label: "工程数",
      columnType: "text",
      width: 80,
      sortable: true,
    },
    {
      key: "estimatedTime",
      label: "所要時間",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => `${value}分`,
    },
    {
      key: "difficulty",
      label: "難易度",
      columnType: "text",
      width: 80,
      sortable: true,
      cellRenderer: (value) => (
        <Badge
          variant="outline"
          className={difficultyColors[value as keyof typeof difficultyColors]}
        >
          {difficultyLabels[value as keyof typeof difficultyLabels]}
        </Badge>
      ),
    },
    {
      key: "version",
      label: "Ver",
      columnType: "text",
      width: 60,
      sortable: true,
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "createdBy",
      label: "作成者",
      columnType: "text",
      width: 120,
      sortable: true,
    },
    {
      key: "updatedAt",
      label: "更新日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 図面カラム設定
// ============================================

export function createDrawingColumns(
  onOpen: (row: Drawing) => void,
  onDelete: (row: Drawing) => void
): ColumnConfig<Drawing>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "drawingNumber",
      label: "図番",
      columnType: "text",
      width: 150,
      sortable: true,
    },
    {
      key: "name",
      label: "図面名",
      columnType: "text",
      width: 220,
      sortable: true,
    },
    {
      key: "productCode",
      label: "製品コード",
      columnType: "text",
      width: 120,
      sortable: true,
    },
    {
      key: "revision",
      label: "Rev",
      columnType: "text",
      width: 60,
      sortable: true,
    },
    {
      key: "scale",
      label: "縮尺",
      columnType: "text",
      width: 70,
      sortable: true,
    },
    {
      key: "sheetSize",
      label: "用紙",
      columnType: "text",
      width: 60,
      sortable: true,
    },
    {
      key: "fileFormat",
      label: "形式",
      columnType: "text",
      width: 70,
      sortable: true,
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "createdBy",
      label: "作成者",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "updatedAt",
      label: "更新日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 注文請書カラム設定
// ============================================

export function createOrderConfirmationColumns(
  onOpen: (row: OrderConfirmation) => void,
  onDelete: (row: OrderConfirmation) => void
): ColumnConfig<OrderConfirmation>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "confirmationNumber",
      label: "請書番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "orderNumber",
      label: "注文番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "customerCode",
      label: "顧客コード",
      columnType: "text",
      width: 100,
      sortable: true,
    },
    {
      key: "customerName",
      label: "顧客名",
      columnType: "text",
      width: 180,
      sortable: true,
    },
    {
      key: "subject",
      label: "件名",
      columnType: "text",
      width: 220,
      sortable: true,
    },
    {
      key: "totalAmount",
      label: "金額",
      columnType: "text",
      width: 120,
      sortable: true,
      cellRenderer: (value) => `¥${(value as number).toLocaleString()}`,
    },
    {
      key: "deliveryDate",
      label: "納期",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "createdBy",
      label: "作成者",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "createdAt",
      label: "作成日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 検収書カラム設定
// ============================================

export function createAcceptanceNoteColumns(
  onOpen: (row: AcceptanceNote) => void,
  onDelete: (row: AcceptanceNote) => void
): ColumnConfig<AcceptanceNote>[] {
  return [
    createOpenAction(onOpen),
    {
      key: "acceptanceNumber",
      label: "検収番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "deliveryNumber",
      label: "納品番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "supplierCode",
      label: "仕入先コード",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "supplierName",
      label: "仕入先名",
      columnType: "text",
      width: 180,
      sortable: true,
    },
    {
      key: "subject",
      label: "品名",
      columnType: "text",
      width: 180,
      sortable: true,
    },
    {
      key: "quantity",
      label: "数量",
      columnType: "text",
      width: 80,
      sortable: true,
      cellRenderer: (value, row) => `${value} ${row.unit}`,
    },
    {
      key: "acceptanceDate",
      label: "検収日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "result",
      label: "結果",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "inspector",
      label: "検収者",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "remarks",
      label: "備考",
      columnType: "text",
      width: 200,
      sortable: false,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 取引基本契約書カラム設定
// ============================================

export function createBasicContractColumns(
  onOpen: (row: BasicContract) => void,
  onDelete: (row: BasicContract) => void
): ColumnConfig<BasicContract>[] {
  const contractTypeLabels: Record<string, string> = {
    sales: "販売",
    purchase: "購買",
    nda: "NDA",
    other: "その他",
  };

  return [
    createOpenAction(onOpen),
    {
      key: "contractNumber",
      label: "契約番号",
      columnType: "text",
      width: 140,
      sortable: true,
    },
    {
      key: "partnerCode",
      label: "取引先コード",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "partnerName",
      label: "取引先名",
      columnType: "text",
      width: 180,
      sortable: true,
    },
    {
      key: "contractType",
      label: "契約種別",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => contractTypeLabels[value as string] || value,
    },
    {
      key: "startDate",
      label: "開始日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "endDate",
      label: "終了日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    {
      key: "autoRenewal",
      label: "自動更新",
      columnType: "text",
      width: 80,
      sortable: true,
      cellRenderer: (value) => (value ? "あり" : "なし"),
    },
    {
      key: "status",
      label: "ステータス",
      columnType: "text",
      width: 100,
      sortable: true,
      cellRenderer: (value) => renderStatus(value as string),
    },
    {
      key: "createdBy",
      label: "作成者",
      columnType: "text",
      width: 110,
      sortable: true,
    },
    {
      key: "createdAt",
      label: "作成日",
      columnType: "date",
      width: 110,
      sortable: true,
    },
    createDeleteAction(onDelete),
  ];
}

// ============================================
// 帳票種別IDからカラム設定を取得
// ============================================

export function getColumnsByTypeId(
  typeId: string,
  onOpen: (row: unknown) => void,
  onDelete: (row: unknown) => void
): ColumnConfig<unknown>[] {
  switch (typeId) {
    case "product-spec":
      return createProductSpecColumns(
        onOpen as (row: ProductSpec) => void,
        onDelete as (row: ProductSpec) => void
      ) as ColumnConfig<unknown>[];
    case "bom":
      return createBOMColumns(
        onOpen as (row: BOM) => void,
        onDelete as (row: BOM) => void
      ) as ColumnConfig<unknown>[];
    case "manufacturing-order":
      return createManufacturingOrderColumns(
        onOpen as (row: ManufacturingOrder) => void,
        onDelete as (row: ManufacturingOrder) => void
      ) as ColumnConfig<unknown>[];
    case "inspection-report":
      return createInspectionReportColumns(
        onOpen as (row: InspectionReport) => void,
        onDelete as (row: InspectionReport) => void
      ) as ColumnConfig<unknown>[];
    case "shipping-inspection":
      return createShippingInspectionColumns(
        onOpen as (row: ShippingInspection) => void,
        onDelete as (row: ShippingInspection) => void
      ) as ColumnConfig<unknown>[];
    case "packing-spec":
      return createPackingSpecColumns(
        onOpen as (row: PackingSpec) => void,
        onDelete as (row: PackingSpec) => void
      ) as ColumnConfig<unknown>[];
    case "assembly-manual":
      return createAssemblyManualColumns(
        onOpen as (row: AssemblyManual) => void,
        onDelete as (row: AssemblyManual) => void
      ) as ColumnConfig<unknown>[];
    case "drawing":
      return createDrawingColumns(
        onOpen as (row: Drawing) => void,
        onDelete as (row: Drawing) => void
      ) as ColumnConfig<unknown>[];
    case "quotation":
      return createQuotationColumns(
        onOpen as (row: Quotation) => void,
        onDelete as (row: Quotation) => void
      ) as ColumnConfig<unknown>[];
    case "purchase-order":
      return createPurchaseOrderColumns(
        onOpen as (row: PurchaseOrder) => void,
        onDelete as (row: PurchaseOrder) => void
      ) as ColumnConfig<unknown>[];
    case "order-confirmation":
      return createOrderConfirmationColumns(
        onOpen as (row: OrderConfirmation) => void,
        onDelete as (row: OrderConfirmation) => void
      ) as ColumnConfig<unknown>[];
    case "delivery-note":
      return createDeliveryNoteColumns(
        onOpen as (row: DeliveryNote) => void,
        onDelete as (row: DeliveryNote) => void
      ) as ColumnConfig<unknown>[];
    case "invoice":
      return createInvoiceColumns(
        onOpen as (row: Invoice) => void,
        onDelete as (row: Invoice) => void
      ) as ColumnConfig<unknown>[];
    case "acceptance-note":
      return createAcceptanceNoteColumns(
        onOpen as (row: AcceptanceNote) => void,
        onDelete as (row: AcceptanceNote) => void
      ) as ColumnConfig<unknown>[];
    case "basic-contract":
      return createBasicContractColumns(
        onOpen as (row: BasicContract) => void,
        onDelete as (row: BasicContract) => void
      ) as ColumnConfig<unknown>[];
    default:
      return [];
  }
}
