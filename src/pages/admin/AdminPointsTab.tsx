import React, { useState } from 'react';
import { SpawnPoint, CampusZone, SpawnTier } from '../../types';
import { Button } from '../../components/ui/Button';
import { Pill } from '../../components/ui/Pill';
import { Toggle } from '../../components/ui/Toggle';
import { InputField } from '../../components/ui/InputField';
import { BottomSheet } from '../../components/ui/BottomSheet';
import {
  Plus,
  Edit2,
  Trash2,
  MapPin,
  CheckCircle2,
  Sliders,
  Search,
  Layers,
  Radio,
} from 'lucide-react';
import { CampusMapCanvas } from '../../components/map/CampusMapCanvas';

export interface AdminPointsTabProps {
  spawns: SpawnPoint[];
  zones: CampusZone[];
  onToggleSpawn: (id: string, enabled: boolean) => Promise<void>;
  onSaveSpawn: (spawn: SpawnPoint) => Promise<void>;
  onCreateSpawn: (spawnData: Omit<SpawnPoint, 'id'>) => Promise<void>;
  onDeleteSpawn: (id: string) => Promise<void>;
}

export const AdminPointsTab: React.FC<AdminPointsTabProps> = ({
  spawns,
  zones,
  onToggleSpawn,
  onSaveSpawn,
  onCreateSpawn,
  onDeleteSpawn,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<string>('all');
  const [editingSpawn, setEditingSpawn] = useState<SpawnPoint | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [selectedSpawnId, setSelectedSpawnId] = useState<string | null>(null);

  // New Spawn Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newZoneId, setNewZoneId] = useState(zones[0]?.id || '');
  const [newPoints, setNewPoints] = useState('100');
  const [newRadius, setNewRadius] = useState('20');
  const [newTier, setNewTier] = useState<SpawnTier>('tier2');

  // Filtered Spawns
  const filteredSpawns = spawns.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.zoneName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZoneFilter === 'all' || s.zoneId === selectedZoneFilter;
    return matchesSearch && matchesZone;
  });

  const activeCount = spawns.filter((s) => s.enabled !== false && s.status === 'active').length;
  const disabledCount = spawns.filter((s) => s.enabled === false).length;

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSpawn) return;
    await onSaveSpawn(editingSpawn);
    setEditingSpawn(null);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const zone = zones.find((z) => z.id === newZoneId) || zones[0];

    const spawnPayload: Omit<SpawnPoint, 'id'> = {
      title: newTitle.trim(),
      code: newCode.trim() || `I9-CP-${String(spawns.length + 1).padStart(2, '0')}`,
      zoneId: zone.id,
      zoneName: zone.name,
      lat: zone.centerLat,
      lng: zone.centerLng,
      svgX: zone.centerSvgX,
      svgY: zone.centerSvgY,
      points: Number(newPoints) || 100,
      claimRadiusMeters: Number(newRadius) || 20,
      tier: newTier,
      status: 'active',
      enabled: true,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    };

    await onCreateSpawn(spawnPayload);

    // Reset Form
    setNewTitle('');
    setNewCode('');
    setIsCreatingNew(false);
  };

  return (
    <div className="flex flex-col gap-4 font-body pb-20 select-none">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-base font-bold font-display tracking-tight text-[#FBF6EE]">
            CAMPUS SPAWN POOL
          </h2>
          <span className="text-[11px] text-[#9B8C84]">
            {activeCount} active live · {disabledCount} disabled · {spawns.length} total
          </span>
        </div>

        {/* A2 Requirement: + New Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreatingNew(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          New Point
        </Button>
      </div>

      {/* A2 Requirement: Mini Campus Map using the SAME Campus SVG system (No Google Maps) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] text-[#9B8C84] px-1">
          <span className="font-mono">MINI CAMPUS SVG OVERVIEW</span>
          <span>Tap pin to inspect</span>
        </div>

        <div className="h-48 w-full rounded-2xl overflow-hidden border border-[#322520] relative">
          <CampusMapCanvas
            spawns={spawns}
            zones={zones}
            playerLat={zones[0]?.centerLat || 37.4275}
            playerLng={zones[0]?.centerLng || -122.1697}
            selectedSpawnId={selectedSpawnId}
            onSelectSpawn={(spawn) => {
              setSelectedSpawnId(spawn.id);
            }}
            showZoneOverlay={true}
          />
        </div>
      </div>

      {/* Search & Zone Filter Bar */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Search className="w-4 h-4 text-[#70625B] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by landmark name, code or zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#231B17] border border-[#322520] rounded-xl pl-9 pr-3 py-2 text-xs text-[#FBF6EE] placeholder-[#70625B] focus:outline-none focus:border-[#F16321]"
          />
        </div>

        {/* Zone Pill Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedZoneFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-colors ${
              selectedZoneFilter === 'all'
                ? 'bg-[#F16321] text-[#FAF4EB] font-bold'
                : 'bg-[#231B17] text-[#9B8C84] border border-[#322520]'
            }`}
          >
            ALL ZONES ({spawns.length})
          </button>
          {zones.map((zone) => {
            const count = spawns.filter((s) => s.zoneId === zone.id).length;
            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZoneFilter(zone.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-colors ${
                  selectedZoneFilter === zone.id
                    ? 'bg-[#F16321] text-[#FAF4EB] font-bold'
                    : 'bg-[#231B17] text-[#9B8C84] border border-[#322520]'
                }`}
              >
                {zone.code} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* A2 Requirement: Spawn-Point List */}
      <div className="flex flex-col gap-2">
        {filteredSpawns.length === 0 ? (
          <div className="p-8 bg-[#231B17] border border-[#322520] rounded-2xl text-center text-xs text-[#9B8C84]">
            No spawn points match your filter criteria.
          </div>
        ) : (
          filteredSpawns.map((spawn) => {
            const isEnabled = spawn.enabled !== false;
            const isSelected = selectedSpawnId === spawn.id;

            return (
              <div
                key={spawn.id}
                onClick={() => setSelectedSpawnId(spawn.id)}
                className={`p-3.5 bg-[#231B17] border rounded-2xl flex flex-col gap-2.5 transition-all ${
                  isSelected ? 'border-[#F16321] shadow-xs' : 'border-[#322520]'
                }`}
              >
                {/* Top Row: Name, Code & Point Value */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#FBF6EE] truncate font-display">
                        {spawn.title}
                      </span>
                      <Pill tier={spawn.tier} size="xs">
                        +{spawn.points} PTS
                      </Pill>
                    </div>
                    <span className="text-[11px] text-[#9B8C84] font-body mt-0.5 truncate">
                      {spawn.zoneName} · {spawn.code}
                    </span>
                  </div>

                  {/* Enabled/Disabled State Toggle (Screen A2 requirement) */}
                  <div
                    className="flex items-center gap-1.5 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Toggle
                      checked={isEnabled}
                      onChange={(val) => onToggleSpawn(spawn.id, val)}
                      size="sm"
                      aria-label={`Toggle ${spawn.title} enabled`}
                    />
                  </div>
                </div>

                {/* Bottom Row: Radius Info & Edit Capability */}
                <div className="flex items-center justify-between pt-2 border-t border-[#2E231E] text-[11px] font-mono text-[#9B8C84]">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Radio className="w-3 h-3 text-[#F16321]" />
                      <span>{spawn.claimRadiusMeters}m radius</span>
                    </span>
                    <span className="text-[#3E2E27]">|</span>
                    <span className={spawn.status === 'active' ? 'text-[#7A9B76]' : 'text-[#9B8C84]'}>
                      {spawn.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Edit Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingSpawn(spawn);
                    }}
                    className="px-2 py-1 rounded-lg bg-[#2E231E] hover:bg-[#3E2E27] text-[#FBF6EE] flex items-center gap-1 text-[11px] transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit Spawn Point Bottom Sheet */}
      {editingSpawn && (
        <BottomSheet
          isOpen={true}
          onClose={() => setEditingSpawn(null)}
          title={`Edit ${editingSpawn.code}`}
        >
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-4 p-4 font-body">
            <InputField
              label="Point Name"
              value={editingSpawn.title}
              onChange={(e) => setEditingSpawn({ ...editingSpawn, title: e.target.value })}
              required
            />

            <InputField
              label="Point Code (e.g. I9-B4-09)"
              value={editingSpawn.code}
              onChange={(e) => setEditingSpawn({ ...editingSpawn, code: e.target.value })}
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#1A1310] uppercase tracking-wider">
                Campus Zone
              </label>
              <select
                value={editingSpawn.zoneId}
                onChange={(e) => {
                  const z = zones.find((item) => item.id === e.target.value);
                  if (z) {
                    setEditingSpawn({
                      ...editingSpawn,
                      zoneId: z.id,
                      zoneName: z.name,
                    });
                  }
                }}
                className="w-full bg-[#FAF4EB] border border-[#EADBC8] rounded-xl px-3 py-2 text-xs text-[#1A1310] focus:outline-none focus:border-[#F16321]"
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} ({z.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Point Value (PTS)"
                type="number"
                value={editingSpawn.points}
                onChange={(e) =>
                  setEditingSpawn({ ...editingSpawn, points: Number(e.target.value) || 0 })
                }
                required
              />

              <InputField
                label="Claim Radius (Meters)"
                type="number"
                value={editingSpawn.claimRadiusMeters}
                onChange={(e) =>
                  setEditingSpawn({
                    ...editingSpawn,
                    claimRadiusMeters: Number(e.target.value) || 15,
                  })
                }
                required
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#FBEEE1] border border-[#EADBC8] rounded-xl">
              <span className="text-xs font-bold text-[#1A1310]">Spawn Enabled</span>
              <Toggle
                checked={editingSpawn.enabled !== false}
                onChange={(val) => setEditingSpawn({ ...editingSpawn, enabled: val })}
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 text-[#D44E11] border-[#D44E11]/40 hover:bg-[#D44E11]/10"
                onClick={async () => {
                  if (confirm(`Delete spawn point ${editingSpawn.code}?`)) {
                    await onDeleteSpawn(editingSpawn.id);
                    setEditingSpawn(null);
                  }
                }}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>

              <Button type="submit" variant="primary" className="flex-1">
                Save Changes
              </Button>
            </div>
          </form>
        </BottomSheet>
      )}

      {/* New Spawn Point Creation Bottom Sheet */}
      {isCreatingNew && (
        <BottomSheet
          isOpen={true}
          onClose={() => setIsCreatingNew(false)}
          title="Create New Campus Spawn"
        >
          <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4 p-4 font-body">
            <InputField
              label="Point Landmark Name"
              placeholder="e.g. Science Library Breezeway"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />

            <InputField
              label="Point Code (Optional)"
              placeholder={`I9-CP-${String(spawns.length + 1).padStart(2, '0')}`}
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#1A1310] uppercase tracking-wider">
                Target Zone
              </label>
              <select
                value={newZoneId}
                onChange={(e) => setNewZoneId(e.target.value)}
                className="w-full bg-[#FAF4EB] border border-[#EADBC8] rounded-xl px-3 py-2 text-xs text-[#1A1310] focus:outline-none focus:border-[#F16321]"
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} ({z.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Point Value (PTS)"
                type="number"
                value={newPoints}
                onChange={(e) => setNewPoints(e.target.value)}
                required
              />

              <InputField
                label="Claim Radius (Meters)"
                type="number"
                value={newRadius}
                onChange={(e) => setNewRadius(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsCreatingNew(false)}
              >
                Cancel
              </Button>

              <Button type="submit" variant="primary" className="flex-1">
                Create Point
              </Button>
            </div>
          </form>
        </BottomSheet>
      )}
    </div>
  );
};
