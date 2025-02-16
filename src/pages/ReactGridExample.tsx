import React from "react";
import { ReactGridExample } from "../components/ReactGridExample";

export const ReactGridExamplePage: React.FC = () => {
  return (
    <div className="overflow-hidden w-full h-full">
      <h1 className="text-2xl mb-4">ReactGrid Example</h1>
      <ReactGridExample />
    </div>
  );
};
