import type { Modifier } from "@dnd-kit/core";

export const restrictToTimeRange: Modifier = ({
  transform,
  draggingNodeRect,
  containerNodeRect,
}) => {
  if (!draggingNodeRect || !containerNodeRect || !transform) {
    return transform;
  }

  const pixelsPerMinute = 100 / 60; // 1分あたりのピクセル数
  const taskWidth = draggingNodeRect.width;
  const taskDurationMinutes = Math.round(taskWidth / pixelsPerMinute);

  // 初期位置を取得（分単位）
  const initialMinutes = Math.round((draggingNodeRect.left - containerNodeRect.left) / pixelsPerMinute);

  // 移動後の位置を計算（分単位）
  const deltaMinutes = Math.round(transform.x / pixelsPerMinute);
  const targetMinutes = initialMinutes + deltaMinutes;

  // 15分単位にスナップ（分単位）
  const snappedMinutes = Math.round(targetMinutes / 15) * 15;

  // 移動可能な範囲を計算（分単位）
  const minMinutes = 0;
  const maxMinutes = 24 * 60 - taskDurationMinutes;

  // 範囲内に制限（分単位）
  const constrainedMinutes = Math.max(minMinutes, Math.min(maxMinutes, snappedMinutes));

  // 移動量を再計算（ピクセル単位）
  const initialX = initialMinutes * pixelsPerMinute;
  const snappedX = constrainedMinutes * pixelsPerMinute;
  const newDeltaX = snappedX - initialX;

  return {
    ...transform,
    x: newDeltaX,
    y: 0,
  };
};
