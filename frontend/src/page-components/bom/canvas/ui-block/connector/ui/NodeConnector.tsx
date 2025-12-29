'use client';

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

  return (
    <path
      d={path}
      fill="none"
      stroke="#94a3b8"
      strokeWidth={2}
      className="pointer-events-none"
    />
  );
}
