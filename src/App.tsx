import { AntdExample } from './components/AntdExample';
import { DndKitExample } from './components/DndKitExample';

function App() {
  return (
    <div className="p-4 space-y-8">
      <div>
        <h1 className="text-2xl mb-4">Antd Example</h1>
        <AntdExample />
      </div>
      <div>
        <h1 className="text-2xl mb-4">DnD Kit Example</h1>
        <DndKitExample />
      </div>
    </div>
  );
}

export default App
