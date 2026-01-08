'use client';

import { useState } from 'react';
import {
  // Core: Item
  items,
  getItemById,
  getItemsByType,
  // Core: ItemRev
  itemRevs,
  getItemRevById,
  getItemRevsByItemId,
  // BOM: BOMHeader
  bomHeaders,
  getBomHeadersByItemRev,
  // BOM: BOMLine
  bomLines,
  getBomLinesByHeader,
  // Facet: FacetType
  facetTypes,
  getFacetTypeById,
  // Facet: FacetInstance
  facetInstances,
  getFacetInstanceById,
  // DocumentType
  documentTypes,
  getDocumentTypeById,
  // Drawing
  drawings,
  getDrawingsByItemRev,
  // Document
  documents,
  getDocumentsByItemRev,
  getDocumentsByType,
  // クエリ関数
  getStatistics,
  findWhereUsed,
  getFacetInstancesByItemRev,
  explodeBom,
} from '@/shared/dummy-data/bom-v2';

type TabType =
  | 'structure'
  | 'items'
  | 'itemRevs'
  | 'bomHeaders'
  | 'bomLines'
  | 'facetTypes'
  | 'facetInstances'
  | 'documentTypes'
  | 'drawings'
  | 'documents'
  | 'explosion'
  | 'whereUsed'
  | 'json';

export default function BomV2TestPage() {
  const [activeTab, setActiveTab] = useState<TabType>('structure');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemRevId, setSelectedItemRevId] = useState<string | null>(null);
  const [selectedDrawingItemRevId, setSelectedDrawingItemRevId] = useState<string | null>(null);
  const [selectedDocumentItemRevId, setSelectedDocumentItemRevId] = useState<string | null>(null);
  const [explosionTargetId, setExplosionTargetId] = useState<string>('REV-PRD-001-B');
  const [whereUsedTargetId, setWhereUsedTargetId] = useState<string>('REV-PRT-001-B');
  const [jsonEntity, setJsonEntity] = useState<string>('all');

  const stats = getStatistics();

  const tabs: { id: TabType; label: string; group?: string }[] = [
    { id: 'structure', label: 'データ構造', group: 'overview' },
    { id: 'items', label: 'Item', group: 'core' },
    { id: 'itemRevs', label: 'ItemRev', group: 'core' },
    { id: 'bomHeaders', label: 'BOMHeader', group: 'bom' },
    { id: 'bomLines', label: 'BOMLine', group: 'bom' },
    { id: 'facetTypes', label: 'FacetType', group: 'facet' },
    { id: 'facetInstances', label: 'FacetInstance', group: 'facet' },
    { id: 'documentTypes', label: 'DocumentType', group: 'document' },
    { id: 'drawings', label: 'Drawing', group: 'document' },
    { id: 'documents', label: 'Document', group: 'document' },
    { id: 'explosion', label: 'BOM展開', group: 'query' },
    { id: 'whereUsed', label: 'Where-Used', group: 'query' },
    { id: 'json', label: 'JSON', group: 'export' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-2 text-3xl font-bold">BOM v2 データ構造確認</h1>
      <p className="mb-6 text-gray-600">
        BizPM設計に基づく新データ構造（Core/BOM/Facet/Document）の全貌
      </p>

      {/* タブ */}
      <div className="mb-6 flex flex-wrap gap-2 border-b pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* データ構造タブ */}
      {activeTab === 'structure' && (
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">BizPM設計 - エンティティ統計</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              <StatCard label="Item" value={stats.itemCount} description="品番の器" color="blue" />
              <StatCard label="ItemRev" value={stats.itemRevCount} description="品番の版" color="green" />
              <StatCard label="BOMHeader" value={stats.bomHeaderCount} description="構成表の表紙" color="purple" />
              <StatCard label="BOMLine" value={stats.bomLineCount} description="構成明細" color="orange" />
              <StatCard label="FacetType" value={stats.facetTypeCount} description="属性スキーマ" color="pink" />
              <StatCard label="FacetInstance" value={stats.facetInstanceCount} description="属性値" color="cyan" />
              <StatCard label="DocumentType" value={stats.documentTypeCount} description="帳票種類" color="indigo" />
              <StatCard label="Drawing" value={stats.drawingCount} description="図面" color="teal" />
              <StatCard label="Document" value={stats.documentCount} description="帳票" color="amber" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">ER図（概念）</h2>
            <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-green-400">
{`┌─────────────────────────────────────────────────────────────────────────────┐
│                       BizPM BOM Architecture v2                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐                                                           │
│  │     Item     │  品番の器（P/N）- 不変のID                                 │
│  │  (Core)      │  pn, name, lifecycle_state                                │
│  └──────┬───────┘                                                           │
│         │ 1:N                                                               │
│         ▼                                                                   │
│  ┌──────────────┐      1:N      ┌──────────────┐                            │
│  │   ItemRev    │──────────────▶│  BOMHeader   │                            │
│  │  (Core)      │               │ (Structure)  │                            │
│  │  rev, status │               │ bom_type     │                            │
│  └──────┬───────┘               │ (EBOM/MBOM)  │                            │
│         │                       └──────┬───────┘                            │
│         │                              │ 1:N                                │
│         │                              ▼                                    │
│         │                       ┌──────────────┐                            │
│         │                       │   BOMLine    │──▶ ItemRev (子)            │
│         │                       │ (Structure)  │                            │
│         │                       │  qty, find#  │                            │
│         │                       └──────────────┘                            │
│         │                                                                   │
│         ├──────────── N:M ──────────────┐                                   │
│         │                               ▼                                   │
│         │                        ┌──────────────┐      N:1     ┌──────────┐ │
│         │                        │FacetInstance │─────────────▶│FacetType │ │
│         │                        │  (Facet)     │              │ (Facet)  │ │
│         │                        │  values_json │              │ schema   │ │
│         │                        └──────────────┘              └──────────┘ │
│         │                                                                   │
│         ├──────────── 1:N ──────────────┐                                   │
│         │                               ▼                                   │
│         │                        ┌──────────────┐                           │
│         │                        │   Drawing    │──▶ FacetInstance[]        │
│         │                        │   (図面)     │    (DRAWING_META)         │
│         │                        │  dwg#, type  │                           │
│         │                        └──────────────┘                           │
│         │                                                                   │
│         └──────────── 1:N ──────────────┐                                   │
│                                         ▼                                   │
│                                  ┌──────────────┐      N:1     ┌──────────┐ │
│                                  │   Document   │─────────────▶│DocType   │ │
│                                  │   (帳票)     │              │(帳票種類)│ │
│                                  │  doc#, title │              │ユーザー定義│
│                                  └──────────────┘              └──────────┘ │
│                                         │                                   │
│                                         └──▶ FacetInstance[] (DOCUMENT_META)│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-3 text-lg font-semibold text-blue-600">Core（骨格）</h3>
              <p className="mb-4 text-sm text-gray-600">
                BOMの最小単位。属性は持たない「IDと履歴」のみ。
              </p>
              <ul className="space-y-2 text-sm">
                <li><strong>Item:</strong> 品番（P/N）の器</li>
                <li><strong>ItemRev:</strong> 特定時点の仕様</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-3 text-lg font-semibold text-purple-600">BOM Structure（構造）</h3>
              <p className="mb-4 text-sm text-gray-600">
                親子関係を表現。単階層のみ保存、多階層は再帰解決。
              </p>
              <ul className="space-y-2 text-sm">
                <li><strong>BOMHeader:</strong> 構成表の表紙（EBOM/MBOM）</li>
                <li><strong>BOMLine:</strong> 子ItemRevと数量</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-3 text-lg font-semibold text-pink-600">Facet（属性）</h3>
              <p className="mb-4 text-sm text-gray-600">
                柔軟な属性管理。スーパーテーブル問題を回避。
              </p>
              <ul className="space-y-2 text-sm">
                <li><strong>FacetType:</strong> JSONスキーマ（型定義）</li>
                <li><strong>FacetInstance:</strong> 実際の値（JSON）</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-3 text-lg font-semibold text-teal-600">Document（文書）</h3>
              <p className="mb-4 text-sm text-gray-600">
                図面・帳票をItemRevに紐づけ。メタデータはFacetで管理。
              </p>
              <ul className="space-y-2 text-sm">
                <li><strong>DocumentType:</strong> 帳票種類（ユーザー定義）</li>
                <li><strong>Drawing:</strong> 図面（組立図、部品図等）</li>
                <li><strong>Document:</strong> 帳票（見積書、発注書等）</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Item内訳</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {(['Product', 'Assembly', 'Part', 'Purchased', 'RawMaterial'] as const).map((type) => (
                <div key={type} className="rounded border p-3">
                  <div className="text-sm text-gray-500">{type}</div>
                  <div className="text-2xl font-bold">
                    {getItemsByType(type).length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Itemタブ */}
      {activeTab === 'items' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Item（品番の器）- {items.length}件</h2>
          <p className="mb-4 text-sm text-gray-600">
            P/N（品番）の不変ID。name, lifecycle_stateを持つ。属性はFacetへ逃がす。
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">id</th>
                  <th className="px-3 py-2 text-left">partNumber (pn)</th>
                  <th className="px-3 py-2 text-left">name</th>
                  <th className="px-3 py-2 text-left">itemType</th>
                  <th className="px-3 py-2 text-left">lifecycleState</th>
                  <th className="px-3 py-2 text-left">category</th>
                  <th className="px-3 py-2 text-left">Revisions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="cursor-pointer border-b hover:bg-gray-50"
                    onClick={() => setSelectedItemId(item.id === selectedItemId ? null : item.id)}
                  >
                    <td className="px-3 py-2 font-mono text-xs">{item.id}</td>
                    <td className="px-3 py-2 font-semibold">{item.partNumber}</td>
                    <td className="px-3 py-2">{item.name}</td>
                    <td className="px-3 py-2">
                      <ItemTypeBadge type={item.itemType} />
                    </td>
                    <td className="px-3 py-2">
                      <LifecycleBadge state={item.lifecycleState} />
                    </td>
                    <td className="px-3 py-2">{item.category ?? '-'}</td>
                    <td className="px-3 py-2">{getItemRevsByItemId(item.id).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedItemId && (
            <div className="mt-4 rounded border bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">選択中Item: {selectedItemId}</h3>
              <pre className="overflow-x-auto text-xs">
                {JSON.stringify(getItemById(selectedItemId), null, 2)}
              </pre>
              <h4 className="mb-2 mt-4 font-semibold">関連ItemRev:</h4>
              <pre className="overflow-x-auto text-xs">
                {JSON.stringify(getItemRevsByItemId(selectedItemId), null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* ItemRevタブ */}
      {activeTab === 'itemRevs' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">ItemRev（品番の版）- {itemRevs.length}件</h2>
          <p className="mb-4 text-sm text-gray-600">
            BOMが参照する最小単位。rev, status, facetInstanceIdsを持つ。
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">id</th>
                  <th className="px-3 py-2 text-left">itemId → Item</th>
                  <th className="px-3 py-2 text-left">revision</th>
                  <th className="px-3 py-2 text-left">status</th>
                  <th className="px-3 py-2 text-left">effectiveDate</th>
                  <th className="px-3 py-2 text-left">changeNote</th>
                  <th className="px-3 py-2 text-left">facetInstanceIds</th>
                </tr>
              </thead>
              <tbody>
                {itemRevs.map((rev) => {
                  const item = getItemById(rev.itemId);
                  return (
                    <tr
                      key={rev.id}
                      className="cursor-pointer border-b hover:bg-gray-50"
                      onClick={() => setSelectedItemRevId(rev.id === selectedItemRevId ? null : rev.id)}
                    >
                      <td className="px-3 py-2 font-mono text-xs">{rev.id}</td>
                      <td className="px-3 py-2">{item?.partNumber}</td>
                      <td className="px-3 py-2 font-semibold">{rev.revision}</td>
                      <td className="px-3 py-2">
                        <StatusBadge status={rev.status} />
                      </td>
                      <td className="px-3 py-2">{rev.effectiveDate ?? '-'}</td>
                      <td className="px-3 py-2 text-xs">{rev.changeNote ?? '-'}</td>
                      <td className="px-3 py-2 text-xs">{rev.facetInstanceIds.length}件</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {selectedItemRevId && (
            <div className="mt-4 rounded border bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">選択中ItemRev: {selectedItemRevId}</h3>
              <pre className="overflow-x-auto text-xs">
                {JSON.stringify(getItemRevById(selectedItemRevId), null, 2)}
              </pre>
              <h4 className="mb-2 mt-4 font-semibold">紐付くFacetInstance:</h4>
              <pre className="overflow-x-auto text-xs">
                {JSON.stringify(getFacetInstancesByItemRev(selectedItemRevId), null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* BOMHeaderタブ */}
      {activeTab === 'bomHeaders' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">BOMHeader（構成表の表紙）- {bomHeaders.length}件</h2>
          <p className="mb-4 text-sm text-gray-600">
            親ItemRevに対するBOMの表紙。bom_type（EBOM/MBOM）で用途を区別。
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">id</th>
                  <th className="px-3 py-2 text-left">parentItemRevId → ItemRev</th>
                  <th className="px-3 py-2 text-left">bomType</th>
                  <th className="px-3 py-2 text-left">version</th>
                  <th className="px-3 py-2 text-left">status</th>
                  <th className="px-3 py-2 text-left">effectiveDate</th>
                  <th className="px-3 py-2 text-left">BOMLines</th>
                </tr>
              </thead>
              <tbody>
                {bomHeaders.map((header) => {
                  const parentRev = getItemRevById(header.parentItemRevId);
                  const parentItem = parentRev ? getItemById(parentRev.itemId) : undefined;
                  const lines = getBomLinesByHeader(header.id);
                  return (
                    <tr key={header.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2 font-mono text-xs">{header.id}</td>
                      <td className="px-3 py-2">
                        {parentItem?.partNumber} Rev.{parentRev?.revision}
                      </td>
                      <td className="px-3 py-2">
                        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                          {header.bomType}
                        </span>
                      </td>
                      <td className="px-3 py-2">{header.version}</td>
                      <td className="px-3 py-2">
                        <StatusBadge status={header.status} />
                      </td>
                      <td className="px-3 py-2">{header.effectiveDate ?? '-'}</td>
                      <td className="px-3 py-2 font-semibold">{lines.length}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BOMLineタブ */}
      {activeTab === 'bomLines' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">BOMLine（構成明細）- {bomLines.length}件</h2>
          <p className="mb-4 text-sm text-gray-600">
            子ItemRevと数量を結びつける。単階層の親子関係のみ保存。
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">id</th>
                  <th className="px-3 py-2 text-left">bomHeaderId</th>
                  <th className="px-3 py-2 text-left">childItemRevId → ItemRev</th>
                  <th className="px-3 py-2 text-left">sequence</th>
                  <th className="px-3 py-2 text-left">quantity</th>
                  <th className="px-3 py-2 text-left">unit</th>
                  <th className="px-3 py-2 text-left">findNumber</th>
                  <th className="px-3 py-2 text-left">refDesignator</th>
                </tr>
              </thead>
              <tbody>
                {bomLines.map((line) => {
                  const childRev = getItemRevById(line.childItemRevId);
                  const childItem = childRev ? getItemById(childRev.itemId) : undefined;
                  return (
                    <tr key={line.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2 font-mono text-xs">{line.id}</td>
                      <td className="px-3 py-2 font-mono text-xs">{line.bomHeaderId}</td>
                      <td className="px-3 py-2">
                        {childItem?.partNumber} Rev.{childRev?.revision}
                      </td>
                      <td className="px-3 py-2">{line.sequence}</td>
                      <td className="px-3 py-2 font-semibold">{line.quantity}</td>
                      <td className="px-3 py-2">{line.unit}</td>
                      <td className="px-3 py-2">{line.findNumber ?? '-'}</td>
                      <td className="px-3 py-2">{line.referenceDesignator ?? '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FacetTypeタブ */}
      {activeTab === 'facetTypes' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">FacetType（属性スキーマ）- {facetTypes.length}件</h2>
          <p className="mb-4 text-sm text-gray-600">
            JSONスキーマで属性の型を定義。部門ごと（Design/Procurement/Manufacturing/Drawing/Document）にカテゴリ分け。
          </p>
          <div className="space-y-4">
            {facetTypes.map((ft) => (
              <div key={ft.id} className="rounded border p-4">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-lg font-semibold">{ft.name}</span>
                  <span className="rounded bg-gray-200 px-2 py-1 text-xs font-mono">{ft.code}</span>
                  <FacetCategoryBadge category={ft.category} />
                </div>
                <div className="mb-2 text-sm text-gray-500">
                  適用ItemType: {ft.applicableItemTypes.join(', ')}
                </div>
                <div className="text-sm text-gray-500">{ft.description}</div>
                <div className="mt-3">
                  <h4 className="mb-2 text-sm font-medium">schema.properties:</h4>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-1 text-left">key</th>
                        <th className="px-2 py-1 text-left">title</th>
                        <th className="px-2 py-1 text-left">type</th>
                        <th className="px-2 py-1 text-left">unit</th>
                        <th className="px-2 py-1 text-left">enum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(ft.schema.properties).map(([key, prop]) => (
                        <tr key={key} className="border-t">
                          <td className="px-2 py-1 font-mono text-xs">{key}</td>
                          <td className="px-2 py-1">{prop.title}</td>
                          <td className="px-2 py-1">{prop.type}</td>
                          <td className="px-2 py-1">{prop.unit ?? '-'}</td>
                          <td className="px-2 py-1 text-xs">
                            {prop.enum ? prop.enum.slice(0, 3).join(', ') + (prop.enum.length > 3 ? '...' : '') : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FacetInstanceタブ */}
      {activeTab === 'facetInstances' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">FacetInstance（属性値）- {facetInstances.length}件</h2>
          <p className="mb-4 text-sm text-gray-600">
            FacetTypeに基づく実際の値。values（JSON）に具体的なデータを格納。
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">id</th>
                  <th className="px-3 py-2 text-left">facetTypeId → FacetType</th>
                  <th className="px-3 py-2 text-left">values (JSON)</th>
                </tr>
              </thead>
              <tbody>
                {facetInstances.slice(0, 50).map((fi) => {
                  const ft = getFacetTypeById(fi.facetTypeId);
                  return (
                    <tr key={fi.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2 font-mono text-xs">{fi.id}</td>
                      <td className="px-3 py-2">
                        <span className="rounded bg-purple-100 px-2 py-1 text-xs">
                          {ft?.code}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <pre className="max-w-xl overflow-x-auto text-xs">
                          {JSON.stringify(fi.values, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {facetInstances.length > 50 && (
              <p className="mt-4 text-sm text-gray-500">
                ※ 表示は最初の50件のみ。全{facetInstances.length}件はJSONタブで確認可能。
              </p>
            )}
          </div>
        </div>
      )}

      {/* DocumentTypeタブ */}
      {activeTab === 'documentTypes' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">DocumentType（帳票種類）- {documentTypes.length}件</h2>
          <p className="mb-4 text-sm text-gray-600">
            ユーザーが定義可能な帳票種類。見積書、発注書、納品書などの帳票タイプを管理。
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {documentTypes.map((dt) => (
              <div key={dt.id} className="rounded border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg font-semibold">{dt.name}</span>
                  <span className="rounded bg-indigo-100 px-2 py-1 text-xs font-mono text-indigo-800">
                    {dt.code}
                  </span>
                </div>
                <div className="mb-2 text-sm text-gray-500">{dt.description}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">採番プレフィックス:</span>
                  <span className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">{dt.numberPrefix}-</span>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  使用中Document: {getDocumentsByType(dt.id).length}件
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drawingタブ */}
      {activeTab === 'drawings' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Drawing（図面）- {drawings.length}件</h2>
          <p className="mb-4 text-sm text-gray-600">
            ItemRevに紐づく図面。組立図、部品図、配線図などの種類があり、メタデータはFacetInstanceで管理。
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">図面番号</th>
                  <th className="px-3 py-2 text-left">タイトル</th>
                  <th className="px-3 py-2 text-left">紐づきItemRev</th>
                  <th className="px-3 py-2 text-left">図面種類</th>
                  <th className="px-3 py-2 text-left">サイズ</th>
                  <th className="px-3 py-2 text-left">シート</th>
                  <th className="px-3 py-2 text-left">Facet</th>
                </tr>
              </thead>
              <tbody>
                {drawings.map((dwg) => {
                  const itemRev = getItemRevById(dwg.itemRevId);
                  const item = itemRev ? getItemById(itemRev.itemId) : undefined;
                  return (
                    <tr
                      key={dwg.id}
                      className="cursor-pointer border-b hover:bg-gray-50"
                      onClick={() => setSelectedDrawingItemRevId(dwg.itemRevId === selectedDrawingItemRevId ? null : dwg.itemRevId)}
                    >
                      <td className="px-3 py-2 font-mono text-xs font-semibold">{dwg.drawingNumber}</td>
                      <td className="px-3 py-2">{dwg.title}</td>
                      <td className="px-3 py-2">
                        {item?.partNumber} Rev.{itemRev?.revision}
                      </td>
                      <td className="px-3 py-2">
                        <DrawingTypeBadge type={dwg.drawingType} />
                      </td>
                      <td className="px-3 py-2">{dwg.sheetSize}</td>
                      <td className="px-3 py-2">{dwg.sheetNumber}/{dwg.totalSheets}</td>
                      <td className="px-3 py-2 text-xs">{dwg.facetInstanceIds.length}件</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {selectedDrawingItemRevId && (
            <div className="mt-4 rounded border bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">ItemRev: {selectedDrawingItemRevId} の図面一覧</h3>
              <pre className="overflow-x-auto text-xs">
                {JSON.stringify(getDrawingsByItemRev(selectedDrawingItemRevId), null, 2)}
              </pre>
              <h4 className="mb-2 mt-4 font-semibold">図面メタデータ（FacetInstance）:</h4>
              {getDrawingsByItemRev(selectedDrawingItemRevId).map((dwg) => (
                <div key={dwg.id} className="mb-2">
                  <div className="text-sm font-medium">{dwg.drawingNumber}:</div>
                  <pre className="overflow-x-auto text-xs">
                    {JSON.stringify(
                      dwg.facetInstanceIds.map((id) => getFacetInstanceById(id)),
                      null,
                      2
                    )}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Documentタブ */}
      {activeTab === 'documents' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Document（帳票）- {documents.length}件</h2>
          <p className="mb-4 text-sm text-gray-600">
            ItemRevに紐づく帳票。見積書、発注書、納品書などがあり、メタデータはFacetInstanceで管理。
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">帳票番号</th>
                  <th className="px-3 py-2 text-left">タイトル</th>
                  <th className="px-3 py-2 text-left">紐づきItemRev</th>
                  <th className="px-3 py-2 text-left">帳票種類</th>
                  <th className="px-3 py-2 text-left">発行日</th>
                  <th className="px-3 py-2 text-left">宛先</th>
                  <th className="px-3 py-2 text-left">Facet</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => {
                  const itemRev = getItemRevById(doc.itemRevId);
                  const item = itemRev ? getItemById(itemRev.itemId) : undefined;
                  const docType = getDocumentTypeById(doc.documentTypeId);
                  return (
                    <tr
                      key={doc.id}
                      className="cursor-pointer border-b hover:bg-gray-50"
                      onClick={() => setSelectedDocumentItemRevId(doc.itemRevId === selectedDocumentItemRevId ? null : doc.itemRevId)}
                    >
                      <td className="px-3 py-2 font-mono text-xs font-semibold">{doc.documentNumber}</td>
                      <td className="px-3 py-2">{doc.title}</td>
                      <td className="px-3 py-2">
                        {item?.partNumber} Rev.{itemRev?.revision}
                      </td>
                      <td className="px-3 py-2">
                        <DocumentTypeBadge type={docType?.name ?? ''} />
                      </td>
                      <td className="px-3 py-2">{doc.issueDate ?? '-'}</td>
                      <td className="px-3 py-2 text-xs">{doc.recipient ?? '-'}</td>
                      <td className="px-3 py-2 text-xs">{doc.facetInstanceIds.length}件</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {selectedDocumentItemRevId && (
            <div className="mt-4 rounded border bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">ItemRev: {selectedDocumentItemRevId} の帳票一覧</h3>
              <pre className="overflow-x-auto text-xs">
                {JSON.stringify(getDocumentsByItemRev(selectedDocumentItemRevId), null, 2)}
              </pre>
              <h4 className="mb-2 mt-4 font-semibold">帳票メタデータ（FacetInstance）:</h4>
              {getDocumentsByItemRev(selectedDocumentItemRevId).map((doc) => (
                <div key={doc.id} className="mb-2">
                  <div className="text-sm font-medium">{doc.documentNumber}:</div>
                  <pre className="overflow-x-auto text-xs">
                    {JSON.stringify(
                      doc.facetInstanceIds.map((id) => getFacetInstanceById(id)),
                      null,
                      2
                    )}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BOM展開タブ */}
      {activeTab === 'explosion' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">BOM展開（Explosion）</h2>
          <p className="mb-4 text-sm text-gray-600">
            親ItemRevから全子孫を再帰的に取得（Multi-Level BOM）
          </p>
          <div className="mb-4">
            <label className="mr-2 text-sm font-medium">親ItemRev ID:</label>
            <select
              value={explosionTargetId}
              onChange={(e) => setExplosionTargetId(e.target.value)}
              className="rounded border px-3 py-2"
            >
              {itemRevs.filter(rev => {
                const headers = getBomHeadersByItemRev(rev.id);
                return headers.length > 0;
              }).map((rev) => {
                const item = getItemById(rev.itemId);
                return (
                  <option key={rev.id} value={rev.id}>
                    {item?.partNumber} Rev.{rev.revision}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Level</th>
                  <th className="px-3 py-2 text-left">childItem P/N</th>
                  <th className="px-3 py-2 text-left">childItem Name</th>
                  <th className="px-3 py-2 text-left">Rev</th>
                  <th className="px-3 py-2 text-left">ItemType</th>
                  <th className="px-3 py-2 text-left">Qty</th>
                  <th className="px-3 py-2 text-left">Unit</th>
                </tr>
              </thead>
              <tbody>
                {explodeBom(explosionTargetId).map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <span style={{ marginLeft: (row.level - 1) * 16 }}>
                        {'└'.repeat(row.level > 1 ? 1 : 0)} L{row.level}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-semibold">{row.childItem.partNumber}</td>
                    <td className="px-3 py-2">{row.childItem.name}</td>
                    <td className="px-3 py-2">{row.childItemRev.revision}</td>
                    <td className="px-3 py-2">
                      <ItemTypeBadge type={row.childItem.itemType} />
                    </td>
                    <td className="px-3 py-2 font-semibold">{row.quantity}</td>
                    <td className="px-3 py-2">{row.bomLine.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Where-Usedタブ */}
      {activeTab === 'whereUsed' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Where-Used（逆展開）</h2>
          <p className="mb-4 text-sm text-gray-600">
            指定したItemRevがどの親BOMで使用されているかを検索
          </p>
          <div className="mb-4">
            <label className="mr-2 text-sm font-medium">検索対象ItemRev ID:</label>
            <select
              value={whereUsedTargetId}
              onChange={(e) => setWhereUsedTargetId(e.target.value)}
              className="rounded border px-3 py-2"
            >
              {itemRevs.map((rev) => {
                const item = getItemById(rev.itemId);
                return (
                  <option key={rev.id} value={rev.id}>
                    {item?.partNumber} Rev.{rev.revision}
                  </option>
                );
              })}
            </select>
          </div>
          {(() => {
            const results = findWhereUsed(whereUsedTargetId);
            const targetRev = getItemRevById(whereUsedTargetId);
            const targetItem = targetRev ? getItemById(targetRev.itemId) : undefined;
            return (
              <div>
                <div className="mb-4 rounded bg-gray-100 p-3">
                  <strong>検索対象:</strong> {targetItem?.partNumber} Rev.{targetRev?.revision} ({targetItem?.name})
                </div>
                {results.length === 0 ? (
                  <p className="text-gray-500">使用先が見つかりません（トップレベルまたは未使用）</p>
                ) : (
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left">親Item P/N</th>
                        <th className="px-3 py-2 text-left">親Item Name</th>
                        <th className="px-3 py-2 text-left">Rev</th>
                        <th className="px-3 py-2 text-left">使用数量</th>
                        <th className="px-3 py-2 text-left">BOMLine ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((usage, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-2 font-semibold">{usage.parentItem.partNumber}</td>
                          <td className="px-3 py-2">{usage.parentItem.name}</td>
                          <td className="px-3 py-2">{usage.parentItemRev.revision}</td>
                          <td className="px-3 py-2 font-semibold">{usage.quantity}</td>
                          <td className="px-3 py-2 font-mono text-xs">{usage.bomLine.id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* JSONタブ */}
      {activeTab === 'json' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">JSON出力</h2>
          <div className="mb-4">
            <label className="mr-2 text-sm font-medium">エンティティ:</label>
            <select
              value={jsonEntity}
              onChange={(e) => setJsonEntity(e.target.value)}
              className="rounded border px-3 py-2"
            >
              <option value="all">全データ</option>
              <option value="items">Item</option>
              <option value="itemRevs">ItemRev</option>
              <option value="bomHeaders">BOMHeader</option>
              <option value="bomLines">BOMLine</option>
              <option value="facetTypes">FacetType</option>
              <option value="facetInstances">FacetInstance</option>
              <option value="documentTypes">DocumentType</option>
              <option value="drawings">Drawing</option>
              <option value="documents">Document</option>
            </select>
          </div>
          <pre className="max-h-[600px] overflow-auto rounded bg-gray-900 p-4 text-xs text-green-400">
            {getJsonOutput(jsonEntity)}
          </pre>
        </div>
      )}
    </div>
  );
}

// ============================================
// ヘルパーコンポーネント
// ============================================

function StatCard({
  label,
  value,
  description,
  color,
}: {
  label: string;
  value: number;
  description: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    orange: 'bg-orange-100 text-orange-800',
    pink: 'bg-pink-100 text-pink-800',
    cyan: 'bg-cyan-100 text-cyan-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    teal: 'bg-teal-100 text-teal-800',
    amber: 'bg-amber-100 text-amber-800',
  };
  return (
    <div className={`rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs opacity-75">{description}</div>
    </div>
  );
}

function ItemTypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    Product: 'bg-blue-100 text-blue-800',
    Assembly: 'bg-green-100 text-green-800',
    Part: 'bg-orange-100 text-orange-800',
    Purchased: 'bg-purple-100 text-purple-800',
    RawMaterial: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`rounded px-2 py-1 text-xs ${colors[type] ?? 'bg-gray-100'}`}>
      {type}
    </span>
  );
}

function LifecycleBadge({ state }: { state: string }) {
  const colors: Record<string, string> = {
    Concept: 'bg-yellow-100 text-yellow-800',
    Development: 'bg-blue-100 text-blue-800',
    Production: 'bg-green-100 text-green-800',
    Discontinued: 'bg-orange-100 text-orange-800',
    Obsolete: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`rounded px-2 py-1 text-xs ${colors[state] ?? 'bg-gray-100'}`}>
      {state}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Draft: 'bg-yellow-100 text-yellow-800',
    InReview: 'bg-blue-100 text-blue-800',
    Released: 'bg-green-100 text-green-800',
    Obsolete: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`rounded px-2 py-1 text-xs ${colors[status] ?? 'bg-gray-100'}`}>
      {status}
    </span>
  );
}

function FacetCategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    Design: 'bg-blue-100 text-blue-800',
    Procurement: 'bg-green-100 text-green-800',
    Manufacturing: 'bg-orange-100 text-orange-800',
    Drawing: 'bg-teal-100 text-teal-800',
    Document: 'bg-indigo-100 text-indigo-800',
  };
  return (
    <span className={`rounded px-2 py-1 text-xs ${colors[category] ?? 'bg-gray-100'}`}>
      {category}
    </span>
  );
}

function DrawingTypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    '外観図': 'bg-blue-100 text-blue-800',
    '組立図': 'bg-green-100 text-green-800',
    '部品図': 'bg-orange-100 text-orange-800',
    '配線図': 'bg-purple-100 text-purple-800',
    '回路図': 'bg-pink-100 text-pink-800',
  };
  return (
    <span className={`rounded px-2 py-1 text-xs ${colors[type] ?? 'bg-gray-100'}`}>
      {type}
    </span>
  );
}

function DocumentTypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    '見積書': 'bg-blue-100 text-blue-800',
    '発注書': 'bg-green-100 text-green-800',
    '納品書': 'bg-cyan-100 text-cyan-800',
    '請求書': 'bg-orange-100 text-orange-800',
    '検査成績書': 'bg-purple-100 text-purple-800',
    '仕様書': 'bg-pink-100 text-pink-800',
    '作業手順書': 'bg-amber-100 text-amber-800',
    '出荷検査表': 'bg-teal-100 text-teal-800',
  };
  return (
    <span className={`rounded px-2 py-1 text-xs ${colors[type] ?? 'bg-gray-100'}`}>
      {type}
    </span>
  );
}

function getJsonOutput(entity: string): string {
  switch (entity) {
    case 'items':
      return JSON.stringify(items, null, 2);
    case 'itemRevs':
      return JSON.stringify(itemRevs, null, 2);
    case 'bomHeaders':
      return JSON.stringify(bomHeaders, null, 2);
    case 'bomLines':
      return JSON.stringify(bomLines, null, 2);
    case 'facetTypes':
      return JSON.stringify(facetTypes, null, 2);
    case 'facetInstances':
      return JSON.stringify(facetInstances, null, 2);
    case 'documentTypes':
      return JSON.stringify(documentTypes, null, 2);
    case 'drawings':
      return JSON.stringify(drawings, null, 2);
    case 'documents':
      return JSON.stringify(documents, null, 2);
    case 'all':
    default:
      return JSON.stringify(
        {
          items,
          itemRevs,
          bomHeaders,
          bomLines,
          facetTypes,
          facetInstances,
          documentTypes,
          drawings,
          documents,
        },
        null,
        2
      );
  }
}
