import { Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { AntdExamplePage } from "./pages/AntdExample";
import { DndKitExamplePage } from "./pages/DndKitExample";
import { ReactGridExamplePage } from "./pages/ReactGridExample";
import { Flex } from "antd";

function App() {
  return (
    <Flex className="flex-col overflow-hidden w-dvw h-dvh justify-start items-center">
      <Navigation />
      <Routes>
        <Route path="/antd" element={<AntdExamplePage />} />
        <Route path="/dnd-kit" element={<DndKitExamplePage />} />
        <Route path="/reactgrid" element={<ReactGridExamplePage />} />
        <Route path="/" element={<Navigate to="/antd" replace />} />
      </Routes>
    </Flex>
  );
}

export default App;
