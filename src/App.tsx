import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AntdExamplePage } from './pages/AntdExample';
import { DndKitExamplePage } from './pages/DndKitExample';
import { ReactGridExamplePage } from './pages/ReactGridExample';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/antd" element={<AntdExamplePage />} />
        <Route path="/dnd-kit" element={<DndKitExamplePage />} />
        <Route path="/reactgrid" element={<ReactGridExamplePage />} />
        <Route path="/" element={<Navigate to="/antd" replace />} />
      </Routes>
    </div>
  );
}

export default App
