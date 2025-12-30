/**
 * キャンバス座標系ユーティリティ
 *
 * 無限キャンバス（パン/ズーム可能なキャンバス）で使用する座標変換関数群。
 * スクリーン座標（ブラウザ上のピクセル位置）とキャンバス座標（仮想空間上の位置）の
 * 相互変換を行う。
 *
 * ## 座標系の説明
 * - スクリーン座標: ブラウザウィンドウ上の実際のピクセル位置
 * - キャンバス座標: パン/ズームに依存しない仮想空間上の位置
 *
 * ## 使用箇所
 * - widgets/bom/canvas/viewport: キャンバスクリック時の座標取得
 * - page-components/bom/canvas: 付箋・ノード配置時の位置計算
 *
 * ## 使用例
 * ```ts
 * // マウスイベントからキャンバス座標を取得
 * const coords = getCanvasCoordinatesFromEvent(event, containerRef.current, viewport);
 * addStickyNote(coords.canvasX, coords.canvasY);
 *
 * // キャンバス座標からスクリーン座標に変換（ツールチップ表示等）
 * const screen = canvasToScreen(node.x, node.y, viewport);
 * ```
 */

export interface CanvasCoordinates {
  canvasX: number;
  canvasY: number;
  screenX: number;
  screenY: number;
}

export interface ViewportState {
  offsetX: number;
  offsetY: number;
  scale: number;
}

/**
 * スクリーン座標からキャンバス座標に変換
 */
export function screenToCanvas(
  screenX: number,
  screenY: number,
  viewport: ViewportState
): { canvasX: number; canvasY: number } {
  const canvasX = (screenX - viewport.offsetX) / viewport.scale;
  const canvasY = (screenY - viewport.offsetY) / viewport.scale;
  return { canvasX, canvasY };
}

/**
 * キャンバス座標からスクリーン座標に変換
 */
export function canvasToScreen(
  canvasX: number,
  canvasY: number,
  viewport: ViewportState
): { screenX: number; screenY: number } {
  const screenX = canvasX * viewport.scale + viewport.offsetX;
  const screenY = canvasY * viewport.scale + viewport.offsetY;
  return { screenX, screenY };
}

/**
 * マウスイベントからキャンバス座標を取得
 */
export function getCanvasCoordinatesFromEvent(
  event: { clientX: number; clientY: number },
  container: HTMLElement,
  viewport: ViewportState
): CanvasCoordinates {
  const rect = container.getBoundingClientRect();
  const screenX = event.clientX - rect.left;
  const screenY = event.clientY - rect.top;

  const { canvasX, canvasY } = screenToCanvas(screenX, screenY, viewport);

  return { canvasX, canvasY, screenX, screenY };
}
