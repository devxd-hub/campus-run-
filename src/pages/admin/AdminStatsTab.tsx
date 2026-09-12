import React, { useState } from 'react';
import { CampusZone, HeatmapPoint } from '../../types';
import { CampusHeatmapCanvas } from '../../components/admin/CampusHeatmapCanvas';
import { Flame, Activity, Map, BarChart2, Radio } from 'lucide-react';

export interface AdminStatsTabProps {
  heatmapPoints: HeatmapPoint[];
  zones: CampusZone[];
}

export const AdminStatsTab: React.FC<AdminStatsTabProps> = ({
  heatmapPoints,
  zones,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<HeatmapPoint | null>(null);

  // Daily activity trend data across the 7-day weekly cycle
  const weeklyActivityData = [
    { day: 'MON', claims: 210, peakHour: '14:00' },
    { day: 'TUE', claims: 290, peakHour: '12:00' },
    { day: 'WED', claims: 410, peakHour: '16:00' },
    { day: 'THU', claims: 380, peakHour: '13:00' },
    { day: 'FRI', claims: 520, peakHour: '15:00' },
    { day: 'SAT', claims: 340, peakHour: '17:00' },
    { day: 'SUN', claims: 480, peakHour: '20:00' },
  ];

  const maxWeeklyClaims = Math.max(...weeklyActivityData.map((d) => d.claims));

  // Zone claim distributions
  const zoneStats = zones.map((zone) => {
    const pointsInZone = heatmapPoints.filter((p) => p.zoneName === zone.name);
    const totalClaims = pointsInZone.reduce((acc, p) => acc + p.claimsCount, 0);
    return {
      id: zone.id,
      name: zone.name,
      code: zone.code,
      totalClaims,
      pointsCount: pointsInZone.length,
    };
  });

  const totalCampusClaims = zoneStats.reduce((acc, z) => acc + z.totalClaims, 0) || 1;

  return (
    <div className="flex flex-col gap-4 font-body pb-20 select-none">
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-base font-bold font-display tracking-tight text-[#FBF6EE]">
            CAMPUS GEOGRAPHIC ANALYTICS
          </h2>
          <span className="text-[11px] text-[#9B8C84]">
            Physical foot-traffic & landmark claim telemetry
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#2E231E] border border-[#3E2E27] text-[#F16321] text-[10px] font-mono">
          <Flame className="w-3 h-3" />
          <span>HEATMAP</span>
        </div>
      </div>

      {/* A5 Requirement: Claim Heatmap Using the Campus Map SVG as Geographic Base */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1 text-xs font-bold text-[#FBF6EE] uppercase font-display">
          <span>GEOGRAPHIC CLAIM HEATMAP</span>
          <span className="text-[10px] text-[#9B8C84] font-mono">Pinch/Drag to pan</span>
        </div>

        {/* Heatmap Campus Canvas */}
        <CampusHeatmapCanvas
          heatmapPoints={heatmapPoints}
          zones={zones}
          selectedPointId={selectedPoint?.id || null}
          onSelectPoint={setSelectedPoint}
        />

        {/* Selected Landmark Inspector Card */}
        {selectedPoint && (
          <div className="p-3 bg-[#231B17] border border-[#F16321] rounded-2xl flex items-center justify-between shadow-xs">
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#FBF6EE] truncate font-display">
                {selectedPoint.title}
              </span>
              <span className="text-[10px] text-[#9B8C84]">
                {selectedPoint.zoneName}
              </span>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-xs font-bold font-mono text-[#F16321]">
                {selectedPoint.claimsCount} claims
              </span>
              <span className="text-[10px] text-[#7A9B76] font-mono">
                {Math.round(selectedPoint.intensity * 100)}% density index
              </span>
            </div>
          </div>
        )}
      </div>

      {/* A5 Requirement: Activity-Over-Time Graph */}
      <div className="p-4 bg-[#231B17] border border-[#322520] rounded-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-[#FBF6EE]">
              WEEKLY CLAIM VELOCITY
            </span>
            <span className="text-[10px] text-[#9B8C84]">
              Daily claim frequency across 7-day rotation cycle
            </span>
          </div>
          <Activity className="w-4 h-4 text-[#F16321]" />
        </div>

        {/* Weekly Bar Chart */}
        <div className="w-full h-36 flex items-end justify-between gap-2 pt-4 pb-2 border-b border-[#322520]">
          {weeklyActivityData.map((item, idx) => {
            const heightPct = Math.max(14, Math.round((item.claims / maxWeeklyClaims) * 100));
            const isPeak = item.claims === maxWeeklyClaims;

            return (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
              >
                <div className="opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity mb-1 bg-[#1A1310] border border-[#3E2E27] px-1.5 py-0.5 rounded text-[9px] font-mono text-[#FBF6EE] whitespace-nowrap z-10 pointer-events-none">
                  {item.claims} (Peak {item.peakHour})
                </div>

                <div
                  className={`w-full rounded-t-sm transition-all ${
                    isPeak
                      ? 'bg-[#F16321]'
                      : 'bg-[#3E2E27] group-hover:bg-[#F16321]/80'
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Day Labels */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#9B8C84] px-1">
          {weeklyActivityData.map((item) => (
            <span key={`day-${item.day}`}>{item.day}</span>
          ))}
        </div>
      </div>

      {/* Zone Distribution Breakdown */}
      <div className="p-4 bg-[#231B17] border border-[#322520] rounded-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-[#FBF6EE]">
              ZONE ACTIVITY DISTRIBUTION
            </span>
            <span className="text-[10px] text-[#9B8C84]">
              Campus geographic partition density
            </span>
          </div>
          <Map className="w-4 h-4 text-[#F16321]" />
        </div>

        <div className="flex flex-col gap-2.5 mt-1">
          {zoneStats.map((zone) => {
            const pct = Math.round((zone.totalClaims / totalCampusClaims) * 100);

            return (
              <div key={zone.id} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#FBF6EE] font-display">
                    {zone.name} ({zone.code})
                  </span>
                  <span className="font-mono text-[#F16321] text-[11px]">
                    {zone.totalClaims} claims ({pct}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#1A1310] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F16321] to-[#E65100] rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
