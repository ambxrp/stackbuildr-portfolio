'use client';

import { useState } from 'react';
import { Network, FolderGit, LayoutTemplate, FileCode } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  path: string;
  details: string;
  type: 'root' | 'layout' | 'component';
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
}

export default function NodeGraph() {
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const nodes: Node[] = [
    { id: 'app', label: 'page.tsx', path: 'app/page.tsx', details: 'Core entry point with server side pre rendering and viewport sections.', type: 'root', x: 50, y: 15 },
    { id: 'cursor', label: 'CustomCursor', path: 'components/CustomCursor.tsx', details: 'Spring inertia tracking cursor for magnetic link triggers.', type: 'component', x: 15, y: 55 },
    { id: 'bg', label: 'InteractiveBackground', path: 'components/InteractiveBackground.tsx', details: 'Cosmic star constellation grid powered by HTML5 Canvas.', type: 'component', x: 38, y: 80 },
    { id: 'console', label: 'BuildConsole', path: 'components/BuildConsole.tsx', details: 'Retro terminal shell with real time compilation progress animations.', type: 'component', x: 50, y: 52 },
    { id: 'sims', label: 'Simulators', path: 'components/*.tsx', details: 'Interactive camera viewfinders, state thermostats, and payment API tunnels.', type: 'component', x: 80, y: 55 },
    { id: 'form', label: 'ContactForm', path: 'components/ContactForm.tsx', details: 'Cloudflare Turnstile token validation synced with Resend email API.', type: 'component', x: 62, y: 80 },
  ];

  const edges: Edge[] = [
    { from: 'app', to: 'cursor' },
    { from: 'app', to: 'bg' },
    { from: 'app', to: 'console' },
    { from: 'app', to: 'sims' },
    { from: 'app', to: 'form' },
  ];

  const activeNode = hoveredNode || selectedNode || nodes[0];

  return (
    <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between font-mono relative overflow-hidden h-[340px]">
      {/* Simulation Header */}
      <div className="flex justify-between items-center border-b border-zinc-800/40 pb-2">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">React Component Hierarchy</span>
        <div className="flex items-center gap-1">
          <Network className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[9px] uppercase font-bold text-purple-400">interactive map</span>
        </div>
      </div>

      {/* SVG Canvas for Node Graph */}
      <div className="flex-1 relative min-h-[140px] my-2 bg-black/40 rounded-lg border border-zinc-900/60 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Connection Lines (Edges) */}
          {edges.map((edge, idx) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const isHighlighted = 
              hoveredNode?.id === fromNode.id || 
              hoveredNode?.id === toNode.id ||
              selectedNode?.id === fromNode.id || 
              selectedNode?.id === toNode.id;

            return (
              <g key={idx}>
                {/* Underglow vector */}
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isHighlighted ? '#a855f7' : '#27272a'}
                  strokeWidth={isHighlighted ? 1.5 : 0.5}
                  className="transition-all duration-300"
                />
                {/* Pulsing signal dot travelling */}
                {isHighlighted && (
                  <circle r="1" fill="#c084fc">
                    <animateMotion
                      dur="2.5s"
                      repeatCount="indefinite"
                      path={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes (positioned with relative percentages) */}
        {nodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredNode?.id === node.id;
          const isRoot = node.type === 'root';

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-200 z-10 interactive before:content-[''] before:absolute before:inset-[-12px] before:rounded-full before:z-0 ${
                isRoot 
                  ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.4)]' 
                  : isSelected || isHovered
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.4)] scale-110'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center pointer-events-none">
                {isRoot ? (
                  <FolderGit className="w-2.5 h-2.5" />
                ) : node.id === 'sims' ? (
                  <LayoutTemplate className="w-2.5 h-2.5" />
                ) : (
                  <FileCode className="w-2.5 h-2.5" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sandbox Log Screen displaying node details */}
      <div className="bg-black/90 border border-zinc-900/60 p-2.5 rounded-lg text-[10px] min-h-[72px] flex flex-col justify-center text-zinc-400 leading-tight">
        <div className="flex justify-between items-center mb-1">
          <span className="text-cyan-400 font-bold">{activeNode.label}</span>
          <span className="text-[8px] text-zinc-500 font-sans">{activeNode.path}</span>
        </div>
        <p className="text-zinc-300 text-[9px] line-clamp-2">{activeNode.details}</p>
      </div>
    </div>
  );
}
