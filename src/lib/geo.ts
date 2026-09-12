import * as turf from '@turf/turf';
import { SpawnPoint } from '../types';

/**
 * Campus Geo Reference Bounds
 * Geographic bounding box mapping to the campus SVG coordinate system (1572 x 2927)
 */
export const CAMPUS_GEO_BOUNDS = {
  // Stanford-like/IIT-style Campus Reference coordinates
  northWest: { lat: 37.4330, lng: -122.1765 },
  southEast: { lat: 37.4215, lng: -122.1615 },
  svgWidth: 1572,
  svgHeight: 2927,
};

/**
 * Maps GPS Latitude and Longitude to SVG coordinate space
 */
export function gpsToSvg(lat: number, lng: number): { x: number; y: number } {
  const { northWest, southEast, svgWidth, svgHeight } = CAMPUS_GEO_BOUNDS;

  const latSpan = northWest.lat - southEast.lat;
  const lngSpan = southEast.lng - northWest.lng;

  // Normalized 0 to 1
  const normX = Math.max(0, Math.min(1, (lng - northWest.lng) / lngSpan));
  const normY = Math.max(0, Math.min(1, (northWest.lat - lat) / latSpan));

  return {
    x: Math.round(normX * svgWidth),
    y: Math.round(normY * svgHeight),
  };
}

/**
 * Maps SVG coordinate space back to GPS Latitude and Longitude
 */
export function svgToGps(x: number, y: number): { lat: number; lng: number } {
  const { northWest, southEast, svgWidth, svgHeight } = CAMPUS_GEO_BOUNDS;

  const normX = Math.max(0, Math.min(1, x / svgWidth));
  const normY = Math.max(0, Math.min(1, y / svgHeight));

  const latSpan = northWest.lat - southEast.lat;
  const lngSpan = southEast.lng - northWest.lng;

  return {
    lat: northWest.lat - normY * latSpan,
    lng: northWest.lng + normX * lngSpan,
  };
}

/**
 * Calculates exact distance in meters between two coordinates using Turf.js
 */
export function getTurfDistanceMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const from = turf.point([lng1, lat1]);
  const to = turf.point([lng2, lat2]);
  const distanceKm = turf.distance(from, to, { units: 'kilometers' });
  return Math.round(distanceKm * 1000);
}

/**
 * Finds the nearest spawn point from player GPS using Turf.js
 */
export function getNearestSpawn(
  playerLat: number,
  playerLng: number,
  spawns: SpawnPoint[]
): { spawn: SpawnPoint; distanceMeters: number } | null {
  if (!spawns || spawns.length === 0) return null;

  let nearestSpawn: SpawnPoint | null = null;
  let minDistance = Infinity;

  for (const spawn of spawns) {
    const dist = getTurfDistanceMeters(playerLat, playerLng, spawn.lat, spawn.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearestSpawn = spawn;
    }
  }

  if (!nearestSpawn) return null;

  return {
    spawn: nearestSpawn,
    distanceMeters: minDistance,
  };
}

/**
 * Determines if player is within claiming proximity of a spawn point
 */
export function isWithinClaimRadius(
  playerLat: number,
  playerLng: number,
  spawn: SpawnPoint
): boolean {
  const distance = getTurfDistanceMeters(playerLat, playerLng, spawn.lat, spawn.lng);
  return distance <= spawn.claimRadiusMeters;
}
