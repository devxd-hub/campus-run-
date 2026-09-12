import React, { useState, useEffect, useCallback } from 'react';
import { SpawnPoint, CampusZone, PlayerProfile } from '../../types';
import { CampusMapCanvas } from '../../components/map/CampusMapCanvas';
import { BottomSheet } from '../../components/ui/BottomSheet';
import { Button } from '../../components/ui/Button';
import { PointDetailSheet } from '../../components/gameplay/PointDetailSheet';
import { LandmarkDetailSheet } from '../../components/gameplay/LandmarkDetailSheet';
import { ClaimConfirmationModal } from '../../components/gameplay/ClaimConfirmationModal';
import { ClaimResult } from '../../services/types';
import { getTurfDistanceMeters, getNearestSpawn, gpsToSvg } from '../../lib/geo';
import { CampusLandmark, getNearbySpawnsForLandmark } from '../../data/landmarks';
import { MAP_PALETTE } from '../../styles/tokens';
import {
  Locate,
  Layers,
  Palette,
  Plus,
  Minus,
  Footprints,
  AlertTriangle,
  WifiOff,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export interface MapPageProps {
  spawns: SpawnPoint[];
  zones: CampusZone[];
  player: PlayerProfile;
  playerLat: number;
  playerLng: number;
  onClaimSpawn: (spawnId: string) => Promise<ClaimResult | { success: boolean; message: string }>;
  isSimulatingGps?: boolean;
  onToggleSimulatedGps?: () => void;
  onUpdateSimulatedPosition?: (lat: number, lng: number) => void;
  locationError?: string | null;
}

export const MapPage: React.FC<MapPageProps> = ({
  spawns,
  zones,
  player,
  playerLat,
  playerLng,
  onClaimSpawn,
  isSimulatingGps,
  onToggleSimulatedGps,
  onUpdateSimulatedPosition,
  locationError,
}) => {
  const [selectedSpawn, setSelectedSpawn] = useState<SpawnPoint | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<CampusLandmark | null>(null);
  const [showZoneOverlay, setShowZoneOverlay] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [zoomAction, setZoomAction] = useState<{
    type: 'in' | 'out' | 'recenter' | 'focus';
    target?: { x: number; y: number };
  } | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showLocationDeniedModal, setShowLocationDeniedModal] = useState(!!locationError);

  // Screen 05: Claim Confirmation Modal State
  const [claimModalData, setClaimModalData] = useState<{
    isOpen: boolean;
    spawn: SpawnPoint;
    pointsEarned: number;
    oldRank: number;
    newRank: number;
    updatedWeeklyPoints: number;
    updatedTotalPoints: number;
  } | null>(null);

  // Monitor online/offline state (Screen 03c)
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update location error state (Screen 03a)
  useEffect(() => {
    if (locationError && !isSimulatingGps) {
      setShowLocationDeniedModal(true);
    } else {
      setShowLocationDeniedModal(false);
    }
  }, [locationError, isSimulatingGps]);

  // Active spawns count
  const activeSpawns = spawns.filter((s) => s.status === 'active');
  const allSpawnsClaimed = activeSpawns.length === 0;

  // Nearest spawn calculation using Turf.js
  const nearestResult = getNearestSpawn(playerLat, playerLng, activeSpawns);

  // Handle pin click
  const handleSelectSpawn = useCallback((spawn: SpawnPoint) => {
    setSelectedLandmark(null);
    setSelectedSpawn(spawn);
    const svgCoords = gpsToSvg(spawn.lat, spawn.lng);
    setZoomAction({ type: 'focus', target: svgCoords });
  }, []);

  // Handle landmark click
  const handleSelectLandmark = useCallback((landmark: CampusLandmark | null) => {
    setSelectedLandmark(landmark);
    if (landmark) setSelectedSpawn(null);
  }, []);

  // Handle background canvas click
  const handleMapClick = useCallback(() => {
    setSelectedSpawn(null);
    setSelectedLandmark(null);
  }, []);

  // Claim handler
  const handleClaim = async (spawnId: string) => {
    const res = (await onClaimSpawn(spawnId)) as ClaimResult;
    if (res.success && res.spawn) {
      // Open Screen 05: Claim Confirmation Modal
      setClaimModalData({
        isOpen: true,
        spawn: res.spawn,
        pointsEarned: res.pointsAwarded,
        oldRank: res.oldRank || player.rank,
        newRank: res.newRank || player.rank,
        updatedWeeklyPoints: res.updatedWeeklyPoints || player.seasonPoints + res.pointsAwarded,
        updatedTotalPoints: res.updatedTotalPoints || player.totalPoints + res.pointsAwarded,
      });
      setSelectedSpawn(null);
      setSelectedLandmark(null);
    }
  };

  // Simulated walk towards target point (Dev/Testing Feature)
  const handleWalkCloser = (targetSpawn?: SpawnPoint) => {
    const target = targetSpawn || selectedSpawn || nearestResult?.spawn;
    if (!target || !onUpdateSimulatedPosition) return;

    // Move player right onto the spawn point (0 meters away)
    onUpdateSimulatedPosition(target.lat, target.lng);
    setZoomAction({ type: 'recenter' });
  };

  const selectedZone = selectedSpawn
    ? zones.find((z) => z.id === selectedSpawn.zoneId) || null
    : null;

  return (
    <div className="relative w-full h-full flex-1 bg-[#FBF6EE] overflow-hidden flex flex-col">
      {/* Screen 03c: Offline Banner */}
      {isOffline && (
        <div className="bg-[#5B7C99] text-[#FAF4EB] px-4 py-2 flex items-center justify-between text-xs font-medium z-30 shadow-xs">
          <div className="flex items-center gap-2">
            <WifiOff className="w-3.5 h-3.5 text-[#FBF6EE]" />
            <span>Offline Mode — Showing cached campus map</span>
          </div>
          <span className="text-[10px] bg-[#FAF4EB]/20 px-2 py-0.5 rounded font-mono">
            LOCAL
          </span>
        </div>
      )}

      {/* Screen 03b: No Active Spawns Banner */}
      {allSpawnsClaimed && (
        <div className="bg-[#1A1310] text-[#FAF4EB] px-4 py-2 flex items-center justify-between text-xs font-medium z-30 shadow-xs border-b border-[#EADBC8]/20">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F16321]" />
            <span>All rotation spawns claimed! Next drop incoming.</span>
          </div>
          <span className="text-[10px] bg-[#F16321] text-[#FAF4EB] px-2 py-0.5 rounded-full font-bold">
            RESETTING
          </span>
        </div>
      )}

      {/* Top Map Action Header Overlay */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        {/* Active Spawns Pill */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 bg-[#FAF4EB]/95 backdrop-blur-md border border-[#EADBC8] rounded-xl shadow-xs">
          <div className="w-2 h-2 rounded-full bg-[#F16321] animate-ping" />
          <span className="text-xs font-bold font-display text-[#1A1310]">
            {activeSpawns.length} ACTIVE
          </span>
          <span className="text-[10px] text-[#70625B] font-mono pl-1 border-l border-[#EADBC8]">
            CAMPUS I9
          </span>
        </div>

        {/* Right Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Map Palette Legend Toggle */}
          <button
            onClick={() => setShowLegend(!showLegend)}
            title="Campus Vector Map Legend"
            className={`p-2 rounded-xl border shadow-xs transition-colors ${
              showLegend
                ? 'bg-[#1A1310] text-[#FAF4EB] border-[#1A1310]'
                : 'bg-[#FAF4EB] text-[#70625B] border-[#EADBC8] hover:text-[#1A1310]'
            }`}
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Zone Overlay Toggle */}
          <button
            onClick={() => setShowZoneOverlay(!showZoneOverlay)}
            title="Toggle Campus Zones"
            className={`p-2 rounded-xl border shadow-xs transition-colors ${
              showZoneOverlay
                ? 'bg-[#FBEEE1] text-[#F16321] border-[#EADBC8]'
                : 'bg-[#FAF4EB] text-[#70625B] border-[#EADBC8] hover:text-[#1A1310]'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* GPS Simulation Toggle */}
          {onToggleSimulatedGps && (
            <button
              onClick={onToggleSimulatedGps}
              title="Toggle GPS Mode"
              className={`px-2.5 py-1.5 rounded-xl border shadow-xs text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isSimulatingGps
                  ? 'bg-[#F16321] text-[#FAF4EB] border-[#D44E11]'
                  : 'bg-[#FAF4EB] text-[#70625B] border-[#EADBC8]'
              }`}
            >
              <Locate className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-wider">
                {isSimulatingGps ? 'SIM GPS' : 'REAL GPS'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Primary D3.js SVG Campus Canvas */}
      <div className="relative flex-1 w-full h-full">
        <CampusMapCanvas
          spawns={spawns}
          zones={zones}
          playerLat={playerLat}
          playerLng={playerLng}
          selectedSpawnId={selectedSpawn?.id || null}
          onSelectSpawn={handleSelectSpawn}
          selectedLandmarkId={selectedLandmark?.id || null}
          onSelectLandmark={handleSelectLandmark}
          showZoneOverlay={showZoneOverlay}
          onMapClick={handleMapClick}
          zoomAction={zoomAction}
        />

        {/* Floating Map Zoom & Recenter Controls (Right Edge) */}
        <div className="absolute right-3 bottom-28 z-20 flex flex-col gap-2 pointer-events-auto">
          {/* Recenter / Locate Button */}
          <button
            onClick={() => setZoomAction({ type: 'recenter' })}
            title="Recenter on my location"
            className="w-11 h-11 bg-[#FAF4EB] text-[#1A1310] border border-[#EADBC8] rounded-xl shadow-md flex items-center justify-center hover:bg-[#FBEEE1] active:scale-95 transition-transform"
          >
            <Locate className="w-5 h-5 text-[#F16321]" />
          </button>

          {/* Walk to Nearest/Selected Button (Proximity testing) */}
          {onUpdateSimulatedPosition && (
            <button
              onClick={() => handleWalkCloser()}
              title="Simulate walking closer"
              className="w-11 h-11 bg-[#FBEEE1] text-[#F16321] border border-[#EADBC8] rounded-xl shadow-md flex items-center justify-center hover:bg-[#F16321] hover:text-[#FAF4EB] active:scale-95 transition-colors"
            >
              <Footprints className="w-5 h-5" />
            </button>
          )}

          {/* Zoom In */}
          <button
            onClick={() => setZoomAction({ type: 'in' })}
            title="Zoom In"
            className="w-11 h-11 bg-[#FAF4EB] text-[#1A1310] border border-[#EADBC8] rounded-xl shadow-md flex items-center justify-center hover:bg-[#FBEEE1] active:scale-95 transition-transform"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => setZoomAction({ type: 'out' })}
            title="Zoom Out"
            className="w-11 h-11 bg-[#FAF4EB] text-[#1A1310] border border-[#EADBC8] rounded-xl shadow-md flex items-center justify-center hover:bg-[#FBEEE1] active:scale-95 transition-transform"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Nearest Spawn Quick Card (When no specific pin or landmark is opened) */}
        {!selectedSpawn && !selectedLandmark && nearestResult && nearestResult.spawn.status === 'active' && (
          <div className="absolute left-3 right-3 bottom-4 z-20 pointer-events-auto">
            <div
              onClick={() => handleSelectSpawn(nearestResult.spawn)}
              className="bg-[#FAF4EB]/95 backdrop-blur-md border border-[#EADBC8] p-3 rounded-2xl shadow-lg flex items-center justify-between cursor-pointer hover:border-[#F16321] transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#FBEEE1] border border-[#EADBC8] flex items-center justify-center text-[#F16321] shrink-0 font-bold font-display">
                  +{nearestResult.spawn.points}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F16321] font-mono">
                      NEAREST POINT
                    </span>
                    <span className="text-[10px] text-[#70625B] font-mono">
                      · {nearestResult.distanceMeters}m away
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1A1310] truncate font-display">
                    {nearestResult.spawn.title}
                  </span>
                  <span className="text-[10px] text-[#70625B] truncate font-body">
                    {nearestResult.spawn.zoneName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-2">
                <Button
                  size="sm"
                  variant={nearestResult.distanceMeters <= nearestResult.spawn.claimRadiusMeters ? 'primary' : 'outline'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectSpawn(nearestResult.spawn);
                  }}
                >
                  {nearestResult.distanceMeters <= nearestResult.spawn.claimRadiusMeters ? 'CLAIM' : 'VIEW'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Landmark Detail Bottom Sheet */}
      {selectedLandmark && !selectedSpawn && (
        <BottomSheet
          isOpen={true}
          onClose={() => setSelectedLandmark(null)}
          title={selectedLandmark.name}
        >
          <LandmarkDetailSheet
            landmark={selectedLandmark}
            nearbySpawns={getNearbySpawnsForLandmark(selectedLandmark, spawns)}
            playerLat={playerLat}
            playerLng={playerLng}
            onSelectSpawn={(spawn) => {
              setSelectedLandmark(null);
              handleSelectSpawn(spawn);
            }}
            onClaimSpawn={handleClaim}
            onClose={() => setSelectedLandmark(null)}
          />
        </BottomSheet>
      )}

      {/* Screens 04 & 04a: Selected Spawn Full Detail Bottom Sheet */}
      {selectedSpawn && (
        <BottomSheet
          isOpen={true}
          onClose={() => setSelectedSpawn(null)}
          title={selectedSpawn.title}
        >
          <PointDetailSheet
            spawn={selectedSpawn}
            zone={selectedZone}
            playerLat={playerLat}
            playerLng={playerLng}
            onClaim={handleClaim}
            onClose={() => setSelectedSpawn(null)}
            onWalkCloser={handleWalkCloser}
          />
        </BottomSheet>
      )}

      {/* Screen 03d: Campus Vector Map Palette Legend */}
      <BottomSheet
        isOpen={showLegend}
        onClose={() => setShowLegend(false)}
        title="Campus Map Palette Legend"
      >
        <div className="flex flex-col gap-3 pb-2 text-[#1A1310]">
          <p className="text-xs text-[#70625B]">
            Architectural category fills sourced strictly from{' '}
            <span className="font-mono text-[#1A1310] font-bold">Group 2-2.svg</span>:
          </p>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {Object.entries(MAP_PALETTE.categories).map(([key, cat]) => (
              <div
                key={key}
                className="flex items-center gap-2.5 p-2 rounded-xl border"
                style={{ backgroundColor: cat.bg, borderColor: cat.border }}
              >
                <div
                  className="w-5 h-5 rounded-lg shrink-0 border border-black/30 shadow-2xs"
                  style={{ backgroundColor: cat.fill }}
                />
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-xs font-bold font-display leading-tight"
                    style={{ color: cat.color }}
                  >
                    {cat.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#70625B] truncate">
                    {cat.fill}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 p-2.5 rounded-xl bg-[#FFF8F2] border border-[#F16321]/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-5 h-5 rounded-lg shrink-0 border border-[#D44E11] shadow-2xs"
                style={{ backgroundColor: MAP_PALETTE.activeGameState.highlight }}
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold font-display text-[#D44E11]">
                  Active Game State
                </span>
                <span className="text-[10px] text-[#70625B]">
                  Spawn pins, player radar, claim CTA & building focus
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#F16321]">
              #F16321
            </span>
          </div>
        </div>
      </BottomSheet>

      {/* Screen 05: Claim Confirmation Modal */}
      {claimModalData && (
        <ClaimConfirmationModal
          isOpen={claimModalData.isOpen}
          spawn={claimModalData.spawn}
          pointsEarned={claimModalData.pointsEarned}
          oldRank={claimModalData.oldRank}
          newRank={claimModalData.newRank}
          updatedWeeklyPoints={claimModalData.updatedWeeklyPoints}
          updatedTotalPoints={claimModalData.updatedTotalPoints}
          onClose={() => setClaimModalData(null)}
        />
      )}

      {/* Screen 03a: Location Denied Modal */}
      {showLocationDeniedModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1310]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#FAF4EB] border border-[#EADBC8] rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FBEEE1] border border-[#EADBC8] flex items-center justify-center text-[#F16321]">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-bold font-display text-[#1A1310]">
                LOCATION PERMISSION REQUIRED
              </h3>
              <p className="text-xs text-[#70625B] leading-relaxed font-body">
                I9 relies on real campus GPS to verify that you are physically within proximity of spawn points when claiming.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2 mt-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  if (onToggleSimulatedGps) onToggleSimulatedGps();
                  setShowLocationDeniedModal(false);
                }}
              >
                ENABLE CAMPUS SIMULATED GPS
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  window.location.reload();
                }}
              >
                RETRY BROWSER GEOLOCATION
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
