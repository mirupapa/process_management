import React from 'react';
import { ReactGrid, TextCell } from '@silevis/reactgrid';

interface TimeSlot {
  hour: number;
  minute: number;
}

const TIME_SLOTS= Array.from({ length: 24 * 4 }, (_, i) => {
  const hour = Math.floor(i / 4);
  const minute = (i % 4) * 15;
  return { hour, minute };
});



type Task = {
  id: number;
  title: string;
  start: TimeSlot;
  end: TimeSlot;
};

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
  const cells = [
    // Header row with hours
    { 
      rowIndex: 0, 
      colIndex: 0,
      Template: TextCell,
      props: { value: '' }
    },
    ...TIME_SLOTS.map((slot, index) => ({
      rowIndex: 0,
      colIndex: index + 1,
      Template: TextCell,
      props: { 
        value: `${slot.hour.toString().padStart(2, '0')}:${slot.minute.toString().padStart(2, '0')}`,
        style: { background: '#fafafa', fontWeight: 'bold', textAlign: 'center' }
      }
    })),
    // Data rows with time spans
    ...TEST_DATA.flatMap((record, index) => [
      {
        rowIndex: index + 1,
        colIndex: 0,
        Template: TextCell,
        props: { 
          value: record.title,
          style: { background: '#fafafa' }
        }
      }
    ])
  ];

  const styledRanges = TEST_DATA.map((record, index) => ({
    range: {
      start: { rowIndex: index + 1, columnIndex: (record.start.hour * 4 + Math.floor(record.start.minute / 15)) + 1 },
      end: { rowIndex: index + 1, columnIndex: (record.end.hour * 4 + Math.floor(record.end.minute / 15)) + 1 }
    },
    styles: { 
      background: '#e6f4ff',
      color: '#1677ff',
      borderLeft: '2px solid #1677ff',
      borderRight: '2px solid #1677ff'
    }
  }));

  return (
    <div className="h-[600px]">
      <ReactGrid 
        rows={Array(TEST_DATA.length + 1).fill({ height: 40 })}
        cells={cells}
        styledRanges={styledRanges}
      />
    </div>
  );
};
