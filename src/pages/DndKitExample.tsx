import React from 'react';
import { DndKitExample } from '../components/DndKitExample';

export const DndKitExamplePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">DnD Kit Example</h1>
      <DndKitExample />
    </div>
  );
};
