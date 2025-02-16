import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow mb-4">
      <div className="container mx-auto px-4">
        <div className="flex space-x-4 py-4">
          <Link
            to="/antd"
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              backgroundColor: location.pathname === '/antd' ? '#ebf5ff' : 'transparent',
              color: location.pathname === '/antd' ? '#2563eb' : '#4b5563',
            }}
          >
            Antd Example
          </Link>
          <Link
            to="/dnd-kit"
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              backgroundColor: location.pathname === '/dnd-kit' ? '#ebf5ff' : 'transparent',
              color: location.pathname === '/dnd-kit' ? '#2563eb' : '#4b5563',
            }}
          >
            DnD Kit Example
          </Link>
          <Link
            to="/reactgrid"
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              backgroundColor: location.pathname === '/reactgrid' ? '#ebf5ff' : 'transparent',
              color: location.pathname === '/reactgrid' ? '#2563eb' : '#4b5563',
            }}
          >
            ReactGrid Example
          </Link>
        </div>
      </div>
    </nav>
  );
};
