import type { Modifier } from "@dnd-kit/core";

export const restrictToTimeRange: Modifier = ({
  transform,
  draggingNodeRect,
}) => {
  if (!draggingNodeRect || !transform) {
    return transform;
  }

  const pixelsPerHour = 100;
  const taskWidth = draggingNodeRect.width;
  const maxX = 2400 - taskWidth; // 24時間分のピクセル幅から要素の幅を引く
  const minX = 0;

  // 現在のX座標
  const currentX = transform.x;

  // 0-24時の範囲内に制限
  const x = Math.max(minX, Math.min(maxX, currentX));

  // 15分単位にスナップ
  const snapToGrid = Math.round((x / pixelsPerHour) * 4) / 4 * pixelsPerHour;

  return {
    ...transform,
    x: snapToGrid,
    y: 0, // y軸の移動を禁止
  };
};
