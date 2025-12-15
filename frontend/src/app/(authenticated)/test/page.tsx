'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui/shadcn/ui/tabs';

// Entity層
import { drawingPageApi } from '@/entities/product/drawing-page/api/drawing-page-api';
import { toDrawingPageList } from '@/entities/product/drawing-page/model/transform';
import { DRAWING_PAGE_FIELD_META } from '@/entities/product/drawing-page/model/field-meta';
import type {
  DrawingPageListDTO,
  DrawingPageDTO,
} from '@/entities/product/drawing-page/model/dto';
import type {
  DrawingPageList,
  DrawingPage,
} from '@/entities/product/drawing-page/model/entity';

// Feature層
import { useDrawingPages } from '@/features/product/drawing-page/get-list/lib/use-drawing-pages';
import { drawingCategoryOptions } from '@/features/product/drawing-page/shared/config/options/drawing-categories';
import { customerOptions } from '@/features/product/drawing-page/shared/config/options/customers';
import { employeeUserOptions } from '@/features/product/drawing-page/shared/config/options/employees';

// ============================================
// Entity テストタブ
// ============================================

function EntityTestTab() {
  const [loading, setLoading] = useState(false);
  const [dtoResponse, setDtoResponse] = useState<DrawingPageListDTO | null>(
    null,
  );
  const [entityResponse, setEntityResponse] = useState<DrawingPageList | null>(
    null,
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const dto = await drawingPageApi.getList({ page: 1, perPage: 5 });
      setDtoResponse(dto);
      const entity = toDrawingPageList(dto);
      setEntityResponse(entity);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedDTO: DrawingPageDTO | null =
    dtoResponse?.items[selectedIndex] ?? null;
  const selectedEntity: DrawingPage | null =
    entityResponse?.items[selectedIndex] ?? null;

  return (
    <div className='space-y-6'>
      <div className='rounded-lg border bg-card p-4'>
        <h2 className='mb-2 text-lg font-semibold'>Entity層の理解</h2>
        <p className='mb-4 text-sm text-muted-foreground'>
          API → DTO(snake_case) → Entity(camelCase) の変換フローを確認
        </p>
        <div className='flex items-center gap-4'>
          <Button onClick={fetchData} disabled={loading}>
            {loading ? '読み込み中...' : 'データ取得'}
          </Button>
          <span className='text-sm text-muted-foreground'>
            USE_MOCK: {process.env.NEXT_PUBLIC_USE_MOCK ?? 'undefined (= Mock)'}
          </span>
        </div>
      </div>

      {dtoResponse && (
        <>
          {/* ページネーション情報 */}
          <div className='rounded-lg border bg-card p-4'>
            <h2 className='mb-3 font-semibold'>ページネーション情報</h2>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <h3 className='mb-2 text-sm font-medium text-muted-foreground'>
                  DTO (snake_case)
                </h3>
                <pre className='rounded bg-muted p-3 text-xs'>
                  {JSON.stringify(
                    {
                      total_count: dtoResponse.total_count,
                      page: dtoResponse.page,
                      per_page: dtoResponse.per_page,
                      has_more: dtoResponse.has_more,
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
              <div>
                <h3 className='mb-2 text-sm font-medium text-muted-foreground'>
                  Entity (camelCase)
                </h3>
                <pre className='rounded bg-muted p-3 text-xs'>
                  {entityResponse &&
                    JSON.stringify(
                      {
                        totalCount: entityResponse.totalCount,
                        page: entityResponse.page,
                        perPage: entityResponse.perPage,
                        hasMore: entityResponse.hasMore,
                      },
                      null,
                      2,
                    )}
                </pre>
              </div>
            </div>
          </div>

          {/* アイテム選択 */}
          <div>
            <h2 className='mb-2 font-semibold'>アイテム選択</h2>
            <div className='flex gap-2'>
              {dtoResponse.items.map((item, index) => (
                <Button
                  key={item.id}
                  variant={selectedIndex === index ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setSelectedIndex(index)}
                >
                  #{item.id} {item.drawing_number}
                </Button>
              ))}
            </div>
          </div>

          {/* 選択アイテムの比較 */}
          {selectedDTO && selectedEntity && (
            <div className='grid grid-cols-2 gap-4'>
              {/* DTO */}
              <div className='rounded-lg border bg-card p-4'>
                <h2 className='mb-3 font-semibold text-orange-600'>
                  DTO (APIレスポンスそのまま)
                </h2>
                <p className='mb-3 text-xs text-muted-foreground'>
                  snake_case / 日付はstring
                </p>
                <div className='space-y-2 text-sm'>
                  <Row label='id' value={selectedDTO.id} type='number' />
                  <Row
                    label='drawing_number'
                    value={selectedDTO.drawing_number}
                  />
                  <Row
                    label='drawing_file_id'
                    value={selectedDTO.drawing_file_id}
                    type='number'
                  />
                  <Row
                    label='page_number'
                    value={selectedDTO.page_number}
                    type='number'
                  />
                  <Row
                    label='leaf_product_name'
                    value={selectedDTO.leaf_product_name}
                  />
                  <Row
                    label='drawing_file_name'
                    value={selectedDTO.drawing_file_name}
                  />
                  <Row
                    label='drawing_category_name'
                    value={selectedDTO.drawing_category_name}
                  />
                  <Row
                    label='customer_name'
                    value={selectedDTO.customer_name}
                  />
                  <Row
                    label='created_by_name'
                    value={selectedDTO.created_by_name}
                  />
                  <Row
                    label='created_at'
                    value={selectedDTO.created_at}
                    highlight
                  />
                  <Row
                    label='updated_at'
                    value={selectedDTO.updated_at}
                    highlight
                  />
                  <Row label='s3_url' value={selectedDTO.s3_url} truncate />
                  <Row label='remarks' value={selectedDTO.remarks} />
                  <Row
                    label='is_shown_similar_search'
                    value={selectedDTO.is_shown_similar_search}
                    type='boolean'
                  />
                </div>
              </div>

              {/* Entity */}
              <div className='rounded-lg border bg-card p-4'>
                <h2 className='mb-3 font-semibold text-blue-600'>
                  Entity (フロントで使う形)
                </h2>
                <p className='mb-3 text-xs text-muted-foreground'>
                  camelCase / 日付はDate型
                </p>
                <div className='space-y-2 text-sm'>
                  <Row label='id' value={selectedEntity.id} type='number' />
                  <Row
                    label='drawingNumber'
                    value={selectedEntity.drawingNumber}
                  />
                  <Row
                    label='drawingFileId'
                    value={selectedEntity.drawingFileId}
                    type='number'
                  />
                  <Row
                    label='pageNumber'
                    value={selectedEntity.pageNumber}
                    type='number'
                  />
                  <Row
                    label='leafProductName'
                    value={selectedEntity.leafProductName}
                  />
                  <Row
                    label='drawingFileName'
                    value={selectedEntity.drawingFileName}
                  />
                  <Row
                    label='drawingCategoryName'
                    value={selectedEntity.drawingCategoryName}
                  />
                  <Row
                    label='customerName'
                    value={selectedEntity.customerName}
                  />
                  <Row
                    label='createdByName'
                    value={selectedEntity.createdByName}
                  />
                  <Row
                    label='createdAt'
                    value={selectedEntity.createdAt.toLocaleString('ja-JP')}
                    highlight
                    extra={`(${selectedEntity.createdAt.constructor.name})`}
                  />
                  <Row
                    label='updatedAt'
                    value={selectedEntity.updatedAt.toLocaleString('ja-JP')}
                    highlight
                    extra={`(${selectedEntity.updatedAt.constructor.name})`}
                  />
                  <Row label='s3Url' value={selectedEntity.s3Url} truncate />
                  <Row label='remarks' value={selectedEntity.remarks} />
                  <Row
                    label='isShownSimilarSearch'
                    value={selectedEntity.isShownSimilarSearch}
                    type='boolean'
                  />
                </div>
              </div>
            </div>
          )}

          {/* 生JSON */}
          <details>
            <summary className='cursor-pointer text-sm text-muted-foreground hover:text-foreground'>
              生JSONを表示
            </summary>
            <div className='mt-4 grid grid-cols-2 gap-4'>
              <div>
                <h3 className='mb-2 text-sm font-medium'>DTO (生)</h3>
                <pre className='max-h-96 overflow-auto rounded bg-muted p-3 text-xs'>
                  {JSON.stringify(selectedDTO, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className='mb-2 text-sm font-medium'>Entity (生)</h3>
                <pre className='max-h-96 overflow-auto rounded bg-muted p-3 text-xs'>
                  {JSON.stringify(
                    selectedEntity,
                    (key, value) => {
                      if (value instanceof Date) {
                        return `[Date] ${value.toISOString()}`;
                      }
                      return value;
                    },
                    2,
                  )}
                </pre>
              </div>
            </div>
          </details>
        </>
      )}
    </div>
  );
}

// ============================================
// Feature テストタブ
// ============================================

function FeatureTestTab() {
  // Feature層のHooksを使用（Entity型を返す）
  const { data, isLoading } = useDrawingPages({ page: 1, perPage: 5 });

  return (
    <div className='space-y-6'>
      {/* Feature層の説明 */}
      <div className='rounded-lg border bg-card p-4'>
        <h2 className='mb-2 text-lg font-semibold'>Feature層の理解</h2>
        <p className='text-sm text-muted-foreground'>
          React Query Hooks
          でEntity型を取得し、page-componentsでconfigを組み立て
        </p>
      </div>

      {/* データ表示 */}
      {isLoading && (
        <div className='rounded-lg border bg-card p-4'>読み込み中...</div>
      )}

      {data && (
        <div className='grid gap-4 lg:grid-cols-2'>
          {/* Entity */}
          <div className='rounded-lg border bg-card p-4'>
            <h3 className='mb-2 font-semibold text-blue-600'>
              DrawingPage (Entity)
            </h3>
            <p className='mb-2 text-xs text-muted-foreground'>
              useDrawingPages() が返すデータ（Entity型そのまま）
            </p>
            <pre className='max-h-80 overflow-auto rounded bg-muted p-3 text-xs'>
              {JSON.stringify(
                data.items[0],
                (key, value) => {
                  if (value instanceof Date) {
                    return `[Date] ${value.toISOString()}`;
                  }
                  return value;
                },
                2,
              )}
            </pre>
          </div>

          {/* 一覧表示 */}
          <div className='rounded-lg border bg-card p-4'>
            <h3 className='mb-2 font-semibold'>一覧プレビュー</h3>
            <p className='mb-2 text-xs text-muted-foreground'>
              null処理や日付フォーマットはWidget側で実行
            </p>
            <div className='space-y-2'>
              {data.items.map((item) => (
                <div
                  key={item.id}
                  className='rounded border bg-muted/50 p-2 text-sm'
                >
                  <div className='font-medium'>
                    {item.drawingNumber || '(図番なし)'}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {item.leafProductName || '(名称なし)'} |{' '}
                    {item.createdAt.toLocaleDateString('ja-JP')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* フィールドメタデータ */}
      <div className='rounded-lg border bg-card p-4'>
        <h3 className='mb-2 font-semibold'>
          DRAWING_PAGE_FIELD_META（Entity層）
        </h3>
        <p className='mb-2 text-xs text-muted-foreground'>
          フィールドのラベル・型定義。page-componentsでconfigを組み立てる際に使用。
        </p>
        <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-3'>
          {DRAWING_PAGE_FIELD_META.slice(0, 9).map((field) => (
            <div
              key={field.key}
              className='rounded border bg-muted/50 p-2 text-xs'
            >
              <div className='font-mono font-medium'>{field.key}</div>
              <div className='text-muted-foreground'>
                {field.label} ({field.type})
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* オプション定義 */}
      <div className='rounded-lg border bg-card p-4'>
        <h3 className='mb-2 font-semibold'>共通オプション（Feature層）</h3>
        <p className='mb-2 text-xs text-muted-foreground'>
          マスターデータはFeature層のshared/config/optionsに配置
        </p>
        <div className='grid gap-4 sm:grid-cols-3'>
          <div>
            <h4 className='mb-1 text-sm font-medium'>カテゴリ</h4>
            <div className='flex flex-wrap gap-1'>
              {drawingCategoryOptions.map((opt) => (
                <span
                  key={opt.value}
                  className='rounded bg-blue-100 px-2 py-0.5 text-xs dark:bg-blue-900'
                >
                  {opt.label}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className='mb-1 text-sm font-medium'>顧客</h4>
            <div className='flex flex-wrap gap-1'>
              {customerOptions.slice(0, 3).map((opt) => (
                <span
                  key={opt.value}
                  className='rounded bg-green-100 px-2 py-0.5 text-xs dark:bg-green-900'
                >
                  {opt.label}
                </span>
              ))}
              <span className='text-xs text-muted-foreground'>...</span>
            </div>
          </div>
          <div>
            <h4 className='mb-1 text-sm font-medium'>従業員</h4>
            <div className='flex flex-wrap gap-1'>
              {employeeUserOptions.slice(0, 3).map((opt) => (
                <span
                  key={opt.id}
                  className='rounded bg-purple-100 px-2 py-0.5 text-xs dark:bg-purple-900'
                >
                  {opt.name}
                </span>
              ))}
              <span className='text-xs text-muted-foreground'>...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// メインページ
// ============================================

export default function TestPage() {
  return (
    <div className='min-h-screen bg-background p-8'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-2 text-2xl font-bold'>FSD レイヤー確認ページ</h1>
        <p className='mb-6 text-muted-foreground'>
          Entity層 / Feature層 の変換フローを確認できます
        </p>

        <Tabs defaultValue='entity' className='w-full'>
          <TabsList className='mb-4'>
            <TabsTrigger value='entity'>Entity層</TabsTrigger>
            <TabsTrigger value='feature'>Feature層</TabsTrigger>
          </TabsList>

          <TabsContent value='entity'>
            <EntityTestTab />
          </TabsContent>

          <TabsContent value='feature'>
            <FeatureTestTab />
          </TabsContent>
        </Tabs>

        {/* データフロー図 */}
        <div className='mt-8 rounded-lg border bg-muted/30 p-4'>
          <h2 className='mb-2 font-semibold'>データフロー</h2>
          <pre className='text-xs'>
            {`
API (DTO: snake_case)
       ↓
   Entities層: toDrawingPage() + DRAWING_PAGE_FIELD_META
       ↓
Entity (camelCase, Date型)
       ↓
   Features層: useDrawingPages() + options（マスターデータ）
       ↓
   Page-Components: ui-block/*/config/ でWidget用configを組み立て
       ↓
   Widgets: null処理・日付フォーマット
`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ヘルパーコンポーネント
// ============================================

function Row({
  label,
  value,
  type = 'string',
  highlight = false,
  truncate = false,
  extra = '',
}: {
  label: string;
  value: unknown;
  type?: 'string' | 'number' | 'boolean';
  highlight?: boolean;
  truncate?: boolean;
  extra?: string;
}) {
  const displayValue = value === null ? 'null' : String(value);
  const valueColor =
    value === null
      ? 'text-muted-foreground'
      : type === 'number'
        ? 'text-green-600'
        : type === 'boolean'
          ? 'text-purple-600'
          : '';

  return (
    <div
      className={`flex justify-between gap-2 ${highlight ? '-mx-2 rounded bg-yellow-50 px-2 py-1 dark:bg-yellow-950' : ''}`}
    >
      <span className='font-mono text-muted-foreground'>{label}</span>
      <span
        className={`font-mono ${valueColor} ${truncate ? 'max-w-48 truncate' : ''}`}
      >
        {displayValue}
        {extra && <span className='ml-1 text-xs text-blue-500'>{extra}</span>}
      </span>
    </div>
  );
}
