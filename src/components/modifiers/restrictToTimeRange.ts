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
  const taskDuration = taskWidth / pixelsPerHour;

  // 現在の移動量を取得
  const deltaX = transform.x;

  // 初期位置を取得
  const initialX = draggingNodeRect.left - containerNodeRect.left;

  // 移動後の位置を計算
  const targetX = initialX + deltaX;

  // 移動可能な範囲を計算
  const minX = 0;
  const maxX = (24 - taskDuration) * pixelsPerHour;

  // 範囲内に制限
  const constrainedX = Math.max(minX, Math.min(maxX, targetX));

  // 15分単位にスナップ
  const snappedX = Math.round(constrainedX / (pixelsPerHour / 4)) * (pixelsPerHour / 4);

  // 移動量を再計算
  const newDeltaX = snappedX - initialX;

  return {
    ...transform,
    x: newDeltaX,
    y: 0,
  };
};
