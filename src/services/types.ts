import {
  SpawnPoint,
  CampusZone,
  PlayerProfile,
  ClaimRecord,
  LeaderboardEntry,
  RotationState,
  AppNotification,
  RotationConfig,
  LeaderboardResetSchedule,
  AdminOverviewStats,
  HeatmapPoint,
} from '../types';

export interface ClaimResult {
  success: boolean;
  pointsAwarded: number;
  message: string;
  oldRank?: number;
  newRank?: number;
  updatedWeeklyPoints?: number;
  updatedTotalPoints?: number;
  spawn?: SpawnPoint;
}

export interface IGameService {
  getActiveRotation(): Promise<RotationState>;
  getSpawns(): Promise<SpawnPoint[]>;
  getZones(): Promise<CampusZone[]>;
  getPlayerProfile(playerId?: string): Promise<PlayerProfile>;
  getClaimsHistory(playerId?: string): Promise<ClaimRecord[]>;
  getLeaderboard(period?: 'week' | 'all-time'): Promise<LeaderboardEntry[]>;
  getWeeklyLeaderboard(): Promise<LeaderboardEntry[]>;
  getAllTimeLeaderboard(): Promise<LeaderboardEntry[]>;
  getNotifications(): Promise<AppNotification[]>;
  markNotificationAsRead(id: string): Promise<void>;
  claimSpawn(spawnId: string, playerLat: number, playerLng: number): Promise<ClaimResult>;
  subscribeToSpawns(callback: (spawns: SpawnPoint[]) => void): () => void;
  subscribeToLeaderboard(callback: (leaderboard: LeaderboardEntry[]) => void): () => void;

  // Admin Methods
  getAdminOverviewStats(): Promise<AdminOverviewStats>;
  getRotationConfig(): Promise<RotationConfig>;
  updateRotationConfig(config: Partial<RotationConfig>): Promise<RotationConfig>;
  forceRotateNow(): Promise<RotationState>;
  getResetSchedule(): Promise<LeaderboardResetSchedule>;
  updateResetSchedule(schedule: Partial<LeaderboardResetSchedule>): Promise<LeaderboardResetSchedule>;
  resetWeeklyLeaderboard(): Promise<{ success: boolean; playersResetCount: number; message: string }>;
  saveSpawnPoint(spawn: SpawnPoint): Promise<SpawnPoint>;
  createSpawnPoint(spawnData: Omit<SpawnPoint, 'id'>): Promise<SpawnPoint>;
  deleteSpawnPoint(spawnId: string): Promise<boolean>;
  toggleSpawnStatus(spawnId: string, enabled: boolean): Promise<SpawnPoint>;
  getHeatmapData(): Promise<HeatmapPoint[]>;
}

export interface IAuthService {
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<PlayerProfile | null>;
}

export interface IPushNotificationService {
  requestPermission(): Promise<NotificationPermission>;
  subscribeToRotationAlerts(): Promise<boolean>;
}
