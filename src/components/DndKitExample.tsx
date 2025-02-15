import React from 'react';
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from '@dnd-kit/core';

const DraggableItem = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable-item',
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-4 bg-blue-100 cursor-move rounded"
      style={style}
    >
      ドラッグできるアイテム
    </div>
  );
};

const DroppableArea = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable-area',
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-8 border-2 border-dashed rounded-lg mt-4 ${
        isOver ? 'border-green-500 bg-green-50' : 'border-gray-300'
      }`}
    >
      ここにドロップ
    </div>
  );
};

export const DndKitExample: React.FC = () => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    if (over) {
      console.log('ドロップ完了:', over.id);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-4">
        <h2 className="text-xl mb-4">ドラッグ＆ドロップの例</h2>
        <DraggableItem />
        <DroppableArea />
      </div>
    </DndContext>
  );
};
