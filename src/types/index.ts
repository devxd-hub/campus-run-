/**
 * Project I9 Core Types
 * Strictly aligned with I9 Technical Specification
 */

export type SpawnTier = 'tier1' | 'tier2' | 'tier3' | 'tier4';

export type SpawnStatus = 'active' | 'claimed' | 'cooldown' | 'expired';

export interface SpawnPoint {
  id: string;
  code: string; // e.g. "I9-B4-09"
  title: string;
  description?: string;
  clue?: string;
  zoneId: string;
  zoneName: string;
  // Geolocation
  lat: number;
  lng: number;
  // SVG Campus Map Coords (0-1000 scale)
  svgX: number;
  svgY: number;
  points: number;
  tier: SpawnTier;
  status: SpawnStatus;
  claimRadiusMeters: number; // typically 15-30m
  enabled?: boolean; // Admin enabled/disabled state
  spawnedAt?: string;
  expiresAt: string;
  claimedBy?: string; // Player ID if single-claim
  claimedAt?: string;
  claimCount?: number;
  maxClaims?: number;
}

export interface CampusZone {
  id: string;
  name: string;
  code: string; // e.g. "NORTH-QUAD", "ENGINEERING-PLAZA"
  description: string;
  svgPath: string; // SVG path data for campus polygon rendering
  centerLat: number;
  centerLng: number;
  centerSvgX: number;
  centerSvgY: number;
  activeSpawnsCount: number;
  totalPointsAvailable: number;
  color?: string;
}

export interface PlayerProfile {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  totalPoints: number;
  seasonPoints: number;
  rank: number;
  tier: string;
  claimsCount: number;
  currentStreakDays: number;
  campusZone?: string;
  role: 'player' | 'admin' | 'superadmin';
  createdAt: string;
  lastActiveAt: string;
}

export interface ClaimRecord {
  id: string;
  spawnId: string;
  spawnCode: string;
  spawnTitle: string;
  zoneName: string;
  pointsAwarded: number;
  claimedAt: string;
  tier: SpawnTier;
  distanceAtClaimMeters: number;
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  username: string;
  avatarUrl?: string;
  points: number;
  claimsCount: number;
  tier: SpawnTier;
  rankChange: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
}

export type NotificationType = 'nearby_spawn' | 'rank_change' | 'claim_confirmed' | 'reset_countdown';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  meta?: {
    pointsAwarded?: number;
    spawnId?: string;
    newRank?: number;
    distanceMeters?: number;
  };
}

export type PlayerNavTab = 'map' | 'explore' | 'claims' | 'leaderboard' | 'profile';

export type AdminNavTab = 'overview' | 'points' | 'rotate' | 'reset' | 'stats';

export interface RotationConfig {
  intervalMinutes: number; // Documented default: 30–45 min
  concurrentActivePoints: number; // Documented default: 15
  minSpawnDistanceMeters: number; // Documented default: 60m
  autoRotateEnabled: boolean;
}

export interface LeaderboardResetSchedule {
  resetDay: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  resetTime: string; // e.g. "11:59 PM"
  nextResetTimestamp: string;
  lastResetTimestamp?: string;
}

export interface AdminOverviewStats {
  activePlayersCount: number;
  pointsClaimedToday: number;
  spawnsLiveCount: number;
  totalSpawnsPool: number;
  topScoreThisWeek: number;
  topPlayerUsername: string;
  participationOverTime: {
    hour: string;
    claims: number;
    activeUsers: number;
  }[];
  mostClaimedSpots: {
    id: string;
    code: string;
    title: string;
    zoneName: string;
    claimsCount: number;
    points: number;
    tier: SpawnTier;
  }[];
}

export interface HeatmapPoint {
  id: string;
  title: string;
  zoneName: string;
  lat: number;
  lng: number;
  svgX: number;
  svgY: number;
  claimsCount: number;
  intensity: number; // 0.0 - 1.0 normalized
}

export interface ToastNotification {
  id: string;
  title: string;
  message?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  durationMs?: number;
}

export interface RotationState {
  rotationId: string;
  rotationNumber: number;
  startedAt: string;
  endsAt: string;
  totalActiveSpawns: number;
  totalSpawnPointsPool: number;
  status: 'active' | 'transitioning' | 'paused';
  nextRotationInSeconds: number;
}

export interface ViewportConfig {
  mode: 'canonical' | '390' | '393' | '412' | 'fluid';
  width: number;
  label: string;
}
