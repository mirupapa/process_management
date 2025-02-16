import type { Modifier } from "@dnd-kit/core";

export const restrictToTimeRange: Modifier = ({
  transform,
  draggingNodeRect,
  containerNodeRect,
}) => {
  if (!draggingNodeRect || !containerNodeRect || !transform) {
    return transform;
  }

  const pixelsPerHour = 100;
  const taskWidth = draggingNodeRect.width;

  // 初期位置を取得（ピクセル単位）
  const initialX = draggingNodeRect.left - containerNodeRect.left;

  // 移動後の位置を計算（ピクセル単位）
  const targetX = initialX + transform.x;

  // 移動可能な範囲を計算（ピクセル単位）
  const minX = 0;
  const maxX = (24 * pixelsPerHour) - taskWidth; // タスクの長さを考慮して範囲を制限

  // 範囲内に制限（ピクセル単位）
  const constrainedX = Math.max(minX, Math.min(maxX, targetX));

  // 15分単位にスナップ（25ピクセル単位）
  const quarterHourPixels = pixelsPerHour / 4; // 25ピクセル
  const snappedX = Math.round(constrainedX / quarterHourPixels) * quarterHourPixels;

  // 移動量を再計算（ピクセル単位）
  const newDeltaX = snappedX - initialX;

  return {
    ...transform,
    x: newDeltaX,
    y: 0,
  };
};
