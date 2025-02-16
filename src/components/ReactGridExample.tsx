import React from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';

interface TimeSlot {
  hour: number;
  minute: number;
}

type Task = {
  id: number;
  title: string;
  start: TimeSlot;
  end: TimeSlot;
};

const TIME_SLOTS = Array.from({ length: 24 * 4 }, (_, i) => {
  const hour = Math.floor(i / 4);
  const minute = (i % 4) * 15;
  return { hour, minute };
});

const TEST_DATA: Task[] = [
  { id: 1, title: 'タスク1', start: { hour: 9, minute: 15 }, end: { hour: 12, minute: 30 } },
  { id: 2, title: 'タスク2', start: { hour: 13, minute: 0 }, end: { hour: 17, minute: 45 } },
  { id: 3, title: 'タスク3', start: { hour: 10, minute: 30 }, end: { hour: 15, minute: 15 } },
  { id: 4, title: 'タスク4', start: { hour: 8, minute: 45 }, end: { hour: 11, minute: 30 } },
  { id: 5, title: 'タスク5', start: { hour: 14, minute: 15 }, end: { hour: 18, minute: 0 } },
  { id: 6, title: 'タスク6', start: { hour: 11, minute: 0 }, end: { hour: 13, minute: 45 } },
  { id: 7, title: 'タスク7', start: { hour: 15, minute: 30 }, end: { hour: 19, minute: 15 } },
  { id: 8, title: 'タスク8', start: { hour: 9, minute: 45 }, end: { hour: 14, minute: 30 } },
  { id: 9, title: 'タスク9', start: { hour: 12, minute: 15 }, end: { hour: 16, minute: 45 } },
  { id: 10, title: 'タスク10', start: { hour: 10, minute: 0 }, end: { hour: 13, minute: 15 } }
];

export const ReactGridExample: React.FC = () => {
  const rows = [
    {
      rowId: 'header',
      height: 40,
      cells: [
        { type: 'text', text: '', style: { background: '#fafafa' } },
        ...TIME_SLOTS.map((slot) => ({
          type: 'text',
          text: `${slot.hour.toString().padStart(2, '0')}:${slot.minute.toString().padStart(2, '0')}`,
          style: { background: '#fafafa', fontWeight: 'bold', textAlign: 'center', padding: '8px' }
        }))
      ]
    },
    ...TEST_DATA.map((record, index) => ({
      rowId: `row-${index}`,
      height: 40,
      cells: [
        {
          type: 'text',
          text: record.title,
          style: { background: '#fafafa', padding: '8px' }
        },
        ...Array(TIME_SLOTS.length).fill({ type: 'text', text: '', style: { padding: '8px' } })
      ]
    }))

  ];

  const highlights = TEST_DATA.flatMap((record, index) => {
    const startCol = (record.start.hour * 4 + Math.floor(record.start.minute / 15)) + 1;
    const endCol = (record.end.hour * 4 + Math.floor(record.end.minute / 15)) + 1;
    return Array.from({ length: endCol - startCol + 1 }, (_, i) => ({
      rowId: `row-${index}`,
      columnId: startCol + i,
      backgroundColor: '#e6f4ff',
      color: '#1677ff',
      borderLeft: i === 0 ? '2px solid #1677ff' : undefined,
      borderRight: i === endCol - startCol ? '2px solid #1677ff' : undefined
    }));
  });

  return (
    <div className="h-[600px]">
      <ReactGrid 
        rows={rows}
        columns={[
          { columnId: 'title', width: 120 },
          ...Array(TIME_SLOTS.length).fill({ width: 80 })
        ]}
        highlights={highlights}
        stickyTopRows={1}
        stickyLeftColumns={1}
      />
    </div>
  );
};
