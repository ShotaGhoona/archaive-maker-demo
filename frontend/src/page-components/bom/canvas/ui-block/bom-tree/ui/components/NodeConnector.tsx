'use client';

import {
  CANVAS_COLORS,
  type CanvasColor,
} from '@/shared/canvas/constant/color';
import {
  CONNECTOR_STROKE_WIDTHS,
  type ConnectorStrokeWidth,
} from '@/shared/canvas/constant/size';

const DEFAULT_COLOR: CanvasColor = 'gray';
const DEFAULT_STROKE: ConnectorStrokeWidth = 'medium';

interface NodeConnectorProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export function NodeConnector({ fromX, fromY, toX, toY }: NodeConnectorProps) {
  // 直角コネクタ（横線→縦線→横線）
  const midX = (fromX + toX) / 2;

  // M: 開始点
  // H: 水平線（中間X座標まで）
  // V: 垂直線（終点Y座標まで）
  // H: 水平線（終点X座標まで）
  const path = `M ${fromX} ${fromY} H ${midX} V ${toY} H ${toX}`;

  const strokeColor = CANVAS_COLORS[DEFAULT_COLOR].code;
  const strokeWidth = CONNECTOR_STROKE_WIDTHS[DEFAULT_STROKE].width;

  return (
    <path
      d={path}
      fill='none'
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      className='pointer-events-none'
    />
  );
}
