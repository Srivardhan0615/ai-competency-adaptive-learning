"use client";

import React, { useState } from "react";
import { Competency, LearnerCompetencyScore } from "@/types";

interface CompetencyRadarProps {
  competencies: Competency[];
  scores: LearnerCompetencyScore[];
  targetLevel?: number;
}

export default function CompetencyRadar({
  competencies,
  scores,
  targetLevel = 4.0,
}: CompetencyRadarProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const size = 380;
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = competencies.length;

  if (numAxes < 3) {
    return (
      <div className="flex items-center justify-center h-72 text-slate-400 text-sm">
        At least 3 competencies required for radar projection.
      </div>
    );
  }

  // Calculate coordinates on radar
  const getCoordinates = (index: number, level: number, maxLevel = 5.0) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = (level / maxLevel) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Build target benchmark polygon
  const targetPoints = competencies
    .map((_, i) => {
      const { x, y } = getCoordinates(i, targetLevel);
      return `${x},${y}`;
    })
    .join(" ");

  // Build current learner level polygon
  const currentPoints = competencies
    .map((comp, i) => {
      const score = scores.find((s) => s.competency_id === comp.id);
      const level = score ? score.current_proficiency_level : 1.0;
      const { x, y } = getCoordinates(i, level);
      return `${x},${y}`;
    })
    .join(" ");

  const concentricLevels = [1, 2, 3, 4, 5];

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Concentric Grid Polygons */}
        {concentricLevels.map((lvl) => {
          const pts = competencies
            .map((_, i) => {
              const { x, y } = getCoordinates(i, lvl);
              return `${x},${y}`;
            })
            .join(" ");
          return (
            <g key={`grid-${lvl}`}>
              <polygon
                points={pts}
                fill="none"
                stroke="rgba(51, 65, 85, 0.4)"
                strokeDasharray={lvl === 5 ? "none" : "3,3"}
                strokeWidth={1}
              />
              <text
                x={center}
                y={center - (lvl / 5.0) * radius + 11}
                textAnchor="middle"
                className="text-[10px] fill-slate-500 font-mono select-none"
              >
                L{lvl}
              </text>
            </g>
          );
        })}

        {/* Axis Spoke Lines */}
        {competencies.map((_, i) => {
          const { x, y } = getCoordinates(i, 5.0);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(71, 85, 105, 0.35)"
              strokeWidth={1}
            />
          );
        })}

        {/* Target Benchmark Polygon */}
        <polygon
          points={targetPoints}
          fill="rgba(99, 102, 241, 0.08)"
          stroke="#6366F1"
          strokeWidth={1.5}
          strokeDasharray="4,4"
        />

        {/* Learner Actual Level Polygon */}
        <polygon
          points={currentPoints}
          fill="rgba(59, 130, 246, 0.28)"
          stroke="#3B82F6"
          strokeWidth={2.5}
          className="transition-all duration-500 ease-out"
        />

        {/* Data Point Nodes */}
        {competencies.map((comp, i) => {
          const score = scores.find((s) => s.competency_id === comp.id);
          const level = score ? score.current_proficiency_level : 1.0;
          const { x, y } = getCoordinates(i, level);
          const isHovered = hoveredIdx === i;

          return (
            <g
              key={`node-${comp.id}`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 7 : 5}
                className="fill-electric-400 stroke-navy-950 stroke-2 transition-all duration-200"
              />
            </g>
          );
        })}

        {/* Axis Labels */}
        {competencies.map((comp, i) => {
          const { x, y, angle } = getCoordinates(i, 5.7);
          const isHovered = hoveredIdx === i;
          return (
            <text
              key={`label-${comp.id}`}
              x={x}
              y={y}
              textAnchor={Math.abs(Math.cos(angle)) < 0.1 ? "middle" : Math.cos(angle) > 0 ? "start" : "end"}
              className={`text-[11px] font-semibold transition-colors duration-200 ${
                isHovered ? "fill-electric-400 font-bold" : "fill-slate-300"
              }`}
            >
              {comp.code}
            </text>
          );
        })}
      </svg>

      {/* Legend & Hover Info */}
      <div className="mt-4 w-full flex items-center justify-between text-xs px-2 border-t border-navy-700/50 pt-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-electric-500 inline-block shadow-sm"></span>
            <span className="text-slate-300 font-medium">Assessed Proficiency</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-0.5 border-t border-dashed border-brand-indigo inline-block"></span>
            <span className="text-slate-400">Target Benchmark (L{targetLevel})</span>
          </div>
        </div>
        {hoveredIdx !== null && (
          <div className="text-electric-400 font-mono text-[11px] font-semibold animate-fade-in">
            {competencies[hoveredIdx].title}: L
            {scores.find((s) => s.competency_id === competencies[hoveredIdx].id)?.current_proficiency_level.toFixed(1) || "1.0"}
          </div>
        )}
      </div>
    </div>
  );
}
