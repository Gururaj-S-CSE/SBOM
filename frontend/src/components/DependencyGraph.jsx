import {
  ReactFlow,
  Background,
  Controls,
} from "reactflow";

import "reactflow/dist/style.css";

const nodes = [
  {
    id: "1",
    data: { label: "SBOM App" },
    position: { x: 250, y: 0 },
  },

  {
    id: "2",
    data: { label: "React" },
    position: { x: 100, y: 150 },
  },

  {
    id: "3",
    data: { label: "Axios" },
    position: { x: 250, y: 150 },
  },

  {
    id: "4",
    data: { label: "Lodash" },
    position: { x: 400, y: 150 },
  },
];

const edges = [
  { id: "e1", source: "1", target: "2" },
  { id: "e2", source: "1", target: "3" },
  { id: "e3", source: "1", target: "4" },
];

function DependencyGraph() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mt-8">
      <h2 className="text-2xl font-bold mb-5">
        Dependency Graph
      </h2>

      <div style={{ height: 450 }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default DependencyGraph;