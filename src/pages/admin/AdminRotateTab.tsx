import React, { useState } from 'react';
import { RotationState, RotationConfig } from '../../types';
import { Button } from '../../components/ui/Button';
import { Toggle } from '../../components/ui/Toggle';
import { Pill } from '../../components/ui/Pill';
import { formatDuration } from '../../lib/utils';
import {
  RefreshCw,
  Clock,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

export interface AdminRotateTabProps {
  rotation: RotationState;
  config: RotationConfig;
  onUpdateConfig: (config: Partial<RotationConfig>) => Promise<void>;
  onForceRotate: () => Promise<void>;
}

export const AdminRotateTab: React.FC<AdminRotateTabProps> = ({
  rotation,
  config,
  onUpdateConfig,
  onForceRotate,
}) => {
  const [intervalVal, setIntervalVal] = useState(config.intervalMinutes || 45);
  const [activePointsVal, setActivePointsVal] = useState(config.concurrentActivePoints || 15);
  const [minDistVal, setMinDistVal] = useState(config.minSpawnDistanceMeters || 60);
  const [autoRotate, setAutoRotate] = useState(config.autoRotateEnabled !== false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleSaveConfig = async () => {
    await onUpdateConfig({
      intervalMinutes: intervalVal,
      concurrentActivePoints: activePointsVal,
      minSpawnDistanceMeters: minDistVal,
      autoRotateEnabled: autoRotate,
    });
  };

  const handleConfirmForceRotate = async () => {
    setIsRotating(true);
    try {
      await onForceRotate();
      setShowConfirmModal(false);
    } finally {
      setIsRotating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 font-body pb-20 select-none">
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-base font-bold font-display tracking-tight text-[#FBF6EE]">
            ROTATION ENGINE
          </h2>
          <span className="text-[11px] text-[#9B8C84]">
            Campus spawn cycle & algorithm rules
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2E231E] border border-[#3E2E27] text-[#F16321] font-bold">
          ROTATION #{rotation.rotationNumber}
        </span>
      </div>

      {/* Live Rotation Status Card */}
      <div className="p-4 bg-[#231B17] border border-[#322520] rounded-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7A9B76] animate-pulse" />
            <span className="text-xs font-bold font-display uppercase tracking-wider text-[#FBF6EE]">
              CURRENT ROTATION ACTIVE
            </span>
          </div>
          <Pill variant="timer" size="xs">
            {formatDuration(rotation.nextRotationInSeconds)} remaining
          </Pill>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#2E231E]">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[#9B8C84]">ACTIVE POINTS</span>
            <span className="text-lg font-bold font-mono text-[#F16321]">
              {rotation.totalActiveSpawns} points
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[#9B8C84]">POOL SIZE</span>
            <span className="text-lg font-bold font-mono text-[#FBF6EE]">
              {rotation.totalSpawnPointsPool} landmarks
            </span>
          </div>
        </div>
      </div>

      {/* A3 Requirements: Rotation Settings Controls */}
      <div className="p-4 bg-[#231B17] border border-[#322520] rounded-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold font-display uppercase tracking-wider text-[#FBF6EE]">
            ALGORITHM PARAMETERS
          </span>
          <span className="text-[10px] font-mono text-[#9B8C84]">DOCUMENTED DEFAULTS</span>
        </div>

        {/* 1. Rotation Interval (Documented default: 30–45 minutes) */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#FBF6EE]">Rotation Interval</span>
              <span className="text-[10px] text-[#9B8C84]">Default range: 30–45 minutes</span>
            </div>
            <span className="text-xs font-bold font-mono text-[#F16321] px-2 py-0.5 bg-[#1A1310] rounded border border-[#322520]">
              {intervalVal} MIN
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {[30, 45, 60, 90].map((val) => (
              <button
                key={`int-${val}`}
                type="button"
                onClick={() => {
                  setIntervalVal(val);
                }}
                className={`py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors ${
                  intervalVal === val
                    ? 'bg-[#F16321] text-[#FAF4EB] border-[#D44E11]'
                    : 'bg-[#1A1310] text-[#9B8C84] border-[#322520] hover:text-[#FBF6EE]'
                }`}
              >
                {val}m
              </button>
            ))}
          </div>
        </div>

        {/* 2. Concurrent Active Points (Documented default: 15 active points) */}
        <div className="flex flex-col gap-2 pt-3 border-t border-[#2E231E]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#FBF6EE]">Concurrent Active Points</span>
              <span className="text-[10px] text-[#9B8C84]">Documented default: 15 active</span>
            </div>
            <span className="text-xs font-bold font-mono text-[#F16321] px-2 py-0.5 bg-[#1A1310] rounded border border-[#322520]">
              {activePointsVal} POINTS
            </span>
          </div>

          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={activePointsVal}
            onChange={(e) => setActivePointsVal(Number(e.target.value))}
            className="w-full accent-[#F16321] bg-[#1A1310] h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#70625B]">
            <span>5 (Low)</span>
            <span className="text-[#F16321] font-bold">15 (Default)</span>
            <span>30 (Dense)</span>
          </div>
        </div>

        {/* 3. Minimum Spawn Distance (Documented default: 60m minimum distance) */}
        <div className="flex flex-col gap-2 pt-3 border-t border-[#2E231E]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#FBF6EE]">Minimum Spawn Distance</span>
              <span className="text-[10px] text-[#9B8C84]">Documented default: 60m separation</span>
            </div>
            <span className="text-xs font-bold font-mono text-[#F16321] px-2 py-0.5 bg-[#1A1310] rounded border border-[#322520]">
              {minDistVal}M
            </span>
          </div>

          <input
            type="range"
            min="30"
            max="120"
            step="10"
            value={minDistVal}
            onChange={(e) => setMinDistVal(Number(e.target.value))}
            className="w-full accent-[#F16321] bg-[#1A1310] h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#70625B]">
            <span>30m (Clustered)</span>
            <span className="text-[#F16321] font-bold">60m (Default)</span>
            <span>120m (Dispersed)</span>
          </div>
        </div>

        {/* Automated pg_cron Rotation Toggle */}
        <div className="flex items-center justify-between pt-3 border-t border-[#2E231E]">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#FBF6EE]">Automated Timer Rotation</span>
            <span className="text-[10px] text-[#9B8C84]">Trigger rotation automatically via cron</span>
          </div>
          <Toggle
            checked={autoRotate}
            onChange={setAutoRotate}
            size="sm"
          />
        </div>

        {/* Save Parameters Button */}
        <Button
          variant="outline"
          className="w-full mt-1 border-[#322520] hover:bg-[#2E231E] text-xs"
          onClick={handleSaveConfig}
        >
          Save Rotation Settings
        </Button>
      </div>

      {/* A3 Requirement: Force Rotate Now with Confirmation */}
      <div className="p-4 bg-[#231B17] border border-[#322520] rounded-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-[#FBF6EE]">
              MANUAL ROTATION OVERRIDE
            </span>
            <span className="text-[10px] text-[#9B8C84]">
              Instantly expire current spawns and pick new points
            </span>
          </div>
          <RefreshCw className="w-4 h-4 text-[#F16321]" />
        </div>

        <p className="text-xs text-[#9B8C84] leading-relaxed font-body">
          Forces an instant rotation cycle. Current active points will be retired and replaced with {activePointsVal} randomly selected campus landmarks.
        </p>

        {/* Force Rotate Button triggers Confirmation Modal */}
        <Button
          variant="primary"
          className="w-full"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={() => setShowConfirmModal(true)}
        >
          FORCE ROTATE NOW
        </Button>
      </div>

      {/* A3 Requirement: Confirmation Step Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1310]/85 backdrop-blur-xs flex items-center justify-center p-4 select-none">
          <div className="w-full max-w-sm bg-[#231B17] border border-[#322520] rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#2E231E] border border-[#3E2E27] flex items-center justify-center text-[#F16321]">
              <RefreshCw className="w-7 h-7" />
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-bold font-display text-[#FBF6EE]">
                CONFIRM FORCE ROTATION?
              </h3>
              <p className="text-xs text-[#9B8C84] leading-relaxed font-body">
                This will immediately retire all {rotation.totalActiveSpawns} currently active spawns and activate a new batch of {activePointsVal} points across campus.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2 mt-2">
              <Button
                variant="primary"
                className="w-full"
                isLoading={isRotating}
                onClick={handleConfirmForceRotate}
              >
                YES, ROTATE SPAWNS NOW
              </Button>

              <Button
                variant="outline"
                className="w-full border-[#322520]"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
