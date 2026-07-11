import ReactFlow, {
  Background,
  Controls,
} from "reactflow";

import "reactflow/dist/style.css";

function DependencyGraph({ graph }) {

  if (!graph) {
    return null;
  }

  // Convert backend nodes into React Flow nodes
  const nodes = (graph.nodes || []).map((node, index) => ({
    id: String(node.id),

    data: {
      label: node.label || node.id,
    },

    position: {
      x: 200 * (index % 4),
      y: 150 * Math.floor(index / 4),
    },
  }));

  // Convert backend edges into React Flow edges
  const edges = (graph.edges || []).map((edge, index) => ({
    id: `e${index}`,
    source: String(edge.source),
    target: String(edge.target),
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Dependency Graph
      </h2>

      <div style={{ height: "500px" }}>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>

      </div>

    </div>
  );
}

export default DependencyGraph;