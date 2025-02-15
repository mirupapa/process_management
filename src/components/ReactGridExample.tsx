import React from 'react';
import { ReactGrid, Cell, TextCell } from '@silevis/reactgrid';

interface TimeRecord {
  id: number;
  title: string;
  startHour: number;
  endHour: number;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const TEST_DATA: TimeRecord[] = [
  { id: 1, title: 'タスク1', startHour: 9, endHour: 12 },
  { id: 2, title: 'タスク2', startHour: 13, endHour: 17 },
  { id: 3, title: 'タスク3', startHour: 10, endHour: 15 },
  { id: 4, title: 'タスク4', startHour: 8, endHour: 11 },
  { id: 5, title: 'タスク5', startHour: 14, endHour: 18 },
  { id: 6, title: 'タスク6', startHour: 11, endHour: 13 },
  { id: 7, title: 'タスク7', startHour: 15, endHour: 19 },
  { id: 8, title: 'タスク8', startHour: 9, endHour: 14 },
  { id: 9, title: 'タスク9', startHour: 12, endHour: 16 },
  { id: 10, title: 'タスク10', startHour: 10, endHour: 13 }
];

export const ReactGridExample: React.FC = () => {
  const cells: Cell[] = [
    // Header row with hours
    { 
      rowIndex: 0, 
      colIndex: 0,
      Template: TextCell,
      props: { value: '' }
    },
    ...HOURS.map((hour) => ({
      rowIndex: 0,
      colIndex: hour + 1,
      Template: TextCell,
      props: { 
        value: `${hour}:00`,
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
      start: { rowIndex: index + 1, columnIndex: record.startHour + 1 },
      end: { rowIndex: index + 1, columnIndex: record.endHour + 1 }
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
