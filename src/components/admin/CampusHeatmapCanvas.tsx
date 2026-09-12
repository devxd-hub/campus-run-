import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { CampusZone, HeatmapPoint } from '../../types';

export interface CampusHeatmapCanvasProps {
  heatmapPoints: HeatmapPoint[];
  zones: CampusZone[];
  onSelectPoint?: (point: HeatmapPoint) => void;
  selectedPointId?: string | null;
}

export const CampusHeatmapCanvas: React.FC<CampusHeatmapCanvasProps> = ({
  heatmapPoints,
  zones,
  onSelectPoint,
  selectedPointId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  // Initialize D3 Zoom and Pan
  useEffect(() => {
    if (!svgRef.current || !gRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 3.5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    svg.call(zoom);

    // Initial center on Academic Core / Central Campus
    const containerWidth = containerRef.current.clientWidth || 375;
    const containerHeight = containerRef.current.clientHeight || 300;

    const initialScale = 0.32;
    const initialX = containerWidth / 2 - 680 * initialScale;
    const initialY = containerHeight / 2 - 1200 * initialScale;

    svg.call(
      zoom.transform,
      d3.zoomIdentity.translate(initialX, initialY).scale(initialScale)
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] bg-[#140F0D] rounded-2xl overflow-hidden border border-[#322520] select-none cursor-grab active:cursor-grabbing"
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 1572 2927"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radial Gradient for Heat Points */}
          <radialGradient id="heat-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F16321" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#E65100" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#FB8C00" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FB8C00" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="heat-intense" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D44E11" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#F16321" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#FF9800" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF9800" stopOpacity="0" />
          </radialGradient>

          {/* Grid pattern for heatmap background */}
          <pattern id="heatmap-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#261C17" strokeWidth="1.5" strokeDasharray="3,3" />
          </pattern>
        </defs>

        {/* Master Zoom Group */}
        <g ref={gRef} id="heatmap-world">
          {/* Dark Background Base */}
          <rect x="0" y="0" width="1572" height="2927" fill="#1A1310" />
          <rect x="0" y="0" width="1572" height="2927" fill="url(#heatmap-grid)" opacity="0.4" />

          {/* Campus Zone Outlines */}
          <g id="heatmap-zones" opacity="0.25">
            {zones.map((zone) => (
              <path
                key={zone.id}
                d={zone.svgPath}
                fill="#2E231E"
                stroke="#F16321"
                strokeWidth="3"
                strokeDasharray="6,4"
              />
            ))}
          </g>

          {/* Simplified Campus Buildings Footprints */}
          <g id="heatmap-buildings" fill="#291F1A" stroke="#3A2C25" strokeWidth="2">
            {/* North Quad */}
            <rect x="240" y="60" width="160" height="100" rx="6" />
            <rect x="440" y="60" width="160" height="100" rx="6" />
            <rect x="300" y="200" width="260" height="90" rx="6" />
            {/* Academic Center */}
            <rect x="320" y="550" width="220" height="130" rx="8" />
            <rect x="600" y="540" width="300" height="160" rx="8" />
            <rect x="420" y="740" width="380" height="140" rx="8" />
            {/* Central Blocks */}
            <rect x="250" y="1060" width="200" height="140" rx="8" />
            <rect x="520" y="1050" width="240" height="160" rx="8" />
            <rect x="350" y="1270" width="360" height="150" rx="8" />
            {/* Athletics & South */}
            <rect x="300" y="1660" width="320" height="180" rx="10" />
            <circle cx="850" cy="1780" r="140" fill="#231B17" stroke="#3A2C25" strokeWidth="2" />
            <rect x="350" y="2280" width="400" height="200" rx="10" />
          </g>

          {/* Heatmap Claim Density Radii Layer */}
          <g id="heatmap-glows">
            {heatmapPoints.map((point) => {
              const radius = 80 + point.intensity * 120;
              const isSelected = selectedPointId === point.id;
              const gradientId = point.intensity > 0.7 ? 'url(#heat-intense)' : 'url(#heat-core)';

              return (
                <g key={`heat-${point.id}`} className="cursor-pointer" onClick={() => onSelectPoint?.(point)}>
                  {/* Outer Radiant Heat Aura */}
                  <circle
                    cx={point.svgX}
                    cy={point.svgY}
                    r={radius}
                    fill={gradientId}
                    opacity={isSelected ? 0.95 : 0.75}
                  />

                  {/* Core Landmark Pin Dot */}
                  <circle
                    cx={point.svgX}
                    cy={point.svgY}
                    r={isSelected ? 10 : 6}
                    fill={isSelected ? '#FBF6EE' : '#F16321'}
                    stroke="#1A1310"
                    strokeWidth="2.5"
                  />

                  {/* Claims Count Label above hotspot */}
                  <text
                    x={point.svgX}
                    y={point.svgY - 14}
                    textAnchor="middle"
                    fill="#FBF6EE"
                    fontSize="18"
                    fontWeight="bold"
                    className="font-mono pointer-events-none select-none"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    {point.claimsCount}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Heatmap Legend Overlay */}
      <div className="absolute bottom-2 left-2 right-2 bg-[#231B17]/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#322520] flex items-center justify-between pointer-events-none text-[10px] font-mono text-[#9B8C84]">
        <span>CAMPUS CLAIM DENSITY</span>
        <div className="flex items-center gap-2">
          <span>LOW</span>
          <div className="w-16 h-2 rounded-full bg-gradient-to-r from-[#FB8C00]/40 via-[#F16321] to-[#D44E11]" />
          <span className="text-[#F16321] font-bold">HIGH</span>
        </div>
      </div>
    </div>
  );
};
