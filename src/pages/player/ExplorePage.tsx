import React, { useState } from 'react';
import { SpawnPoint, CampusZone } from '../../types';
import { Pill } from '../../components/ui/Pill';
import { SpawnPin } from '../../components/ui/SpawnPin';
import { EmptyState } from '../../components/ui/EmptyState';
import { Compass, MapPin, Search } from 'lucide-react';
import { InputField } from '../../components/ui/InputField';

export interface ExplorePageProps {
  zones: CampusZone[];
  spawns: SpawnPoint[];
  onSelectSpawn: (spawn: SpawnPoint) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  zones,
  spawns,
  onSelectSpawn,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpawns = spawns.filter((s) => {
    const matchesZone = selectedZoneId === 'all' || s.zoneId === selectedZoneId;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.zoneName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSearch;
  });

  return (
    <div className="flex-1 w-full p-4 flex flex-col gap-4 overflow-y-auto">
      {/* Title & Search */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold font-display tracking-tight text-[#1A1310]">
          Campus Exploration
        </h2>
        <InputField
          placeholder="Search spawns or zones..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Zone Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedZoneId('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
            selectedZoneId === 'all'
              ? 'bg-[#F16321] text-[#FBF6EE] font-bold font-display'
              : 'bg-[#FBEEE1] text-[#1A1310] border border-[#EADBC8]'
          }`}
        >
          All Zones ({spawns.length})
        </button>
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setSelectedZoneId(zone.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
              selectedZoneId === zone.id
                ? 'bg-[#F16321] text-[#FBF6EE] font-bold font-display'
                : 'bg-[#FBEEE1] text-[#1A1310] border border-[#EADBC8]'
            }`}
          >
            {zone.name}
          </button>
        ))}
      </div>

      {/* Spawns List */}
      <div className="flex flex-col gap-2.5">
        {filteredSpawns.length === 0 ? (
          <EmptyState
            icon={<Compass className="w-6 h-6" />}
            title="No spawns found"
            description="Try changing the filter or search query."
          />
        ) : (
          filteredSpawns.map((spawn) => (
            <div
              key={spawn.id}
              onClick={() => onSelectSpawn(spawn)}
              className="p-3.5 bg-[#FAF4EB] border border-[#EADBC8] hover:border-[#D5C4AE] rounded-xl flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <SpawnPin spawn={spawn} size="sm" />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-[#1A1310] truncate font-body">
                    {spawn.title}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#70625B]">
                    <span>{spawn.zoneName}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">{spawn.code}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <Pill tier={spawn.tier} size="xs">
                  +{spawn.points} PTS
                </Pill>
                <span className="text-[10px] text-[#70625B] mt-1">
                  {spawn.status === 'claimed' ? 'Claimed' : 'Active'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
