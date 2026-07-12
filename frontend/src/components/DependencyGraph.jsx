import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from "reactflow";
import { Network, Box } from "lucide-react";
import "reactflow/dist/style.css";

function DependencyGraph({ graph }) {
  if (!graph) {
    return null;
  }

  // Convert backend nodes into styled React Flow nodes
  const nodes = (graph.nodes || []).map((node, index) => ({
    id: String(node.id),
    data: {
      label: (
        <div className="flex items-center gap-2">
          <Box size={13} className="text-indigo-500 shrink-0" />
          <span className="font-semibold text-[11px] text-slate-800 truncate max-w-[120px]" title={node.label || node.id}>
            {node.label || node.id}
          </span>
        </div>
      ),
    },
    // Position using a simple grid that spaces elements nicely
    position: {
      x: 220 * (index % 4) + 50,
      y: 130 * Math.floor(index / 4) + 50,
    },
    style: {
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
      padding: "8px 12px",
      width: "170px",
    }
  }));

  // Convert backend edges into styled smooth step React Flow edges
  const edges = (graph.edges || []).map((edge, index) => ({
    id: `e${index}`,
    source: String(edge.source),
    target: String(edge.target),
    type: "smoothstep",
    animated: true,
    style: { stroke: "#a5b4fc", strokeWidth: 1.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#a5b4fc",
    },
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
        <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg border border-indigo-100/50">
          <Network size={16} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Interactive Dependency Graph
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">
            Visual topology map of all software packages and downstream connection linkages
          </p>
        </div>
      </div>

      <div className="h-[450px] border border-slate-150 rounded-xl overflow-hidden bg-slate-50/20 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          maxZoom={1.5}
          minZoom={0.5}
        >
          <Background variant="dots" gap={16} size={1} color="#e2e8f0" />
          <Controls showInteractive={false} className="border border-slate-200/50 bg-white" />
          <MiniMap 
            nodeColor="#cbd5e1" 
            maskColor="rgba(241, 245, 249, 0.4)" 
            style={{ height: 80, width: 120, borderRadius: 8, border: "1px solid #e2e8f0" }} 
          />
        </ReactFlow>
      </div>
    </div>
  );
}

export default DependencyGraph;