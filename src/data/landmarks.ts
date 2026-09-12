import { SpawnPoint } from '../types';

export type LandmarkCategory =
  | 'hostel'
  | 'lecture_hall'
  | 'academic'
  | 'sports'
  | 'dining'
  | 'facility'
  | 'admin';

export interface CampusLandmark {
  id: string;
  name: string;
  category: LandmarkCategory;
  categoryLabel: string;
  code: string;
  description: string;
  svgX: number;
  svgY: number;
  zoneId: string;
}

/**
 * Registry of all recognized landmarks mapped from Group 2-2.svg IDs
 */
export const CAMPUS_LANDMARKS: Record<string, CampusLandmark> = {
  // Hostels
  bh7: {
    id: 'bh7',
    name: 'Boys Hostel 7 (BH-7)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-07',
    description: 'North hostel block with central courtyard garden and stone promenade.',
    svgX: 385,
    svgY: 137,
    zoneId: 'zone-north-hostels',
  },
  bh2: {
    id: 'bh2',
    name: 'Boys Hostel 2 (BH-2)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-02',
    description: 'Residential pavilion bordering the north recreation tree line.',
    svgX: 585,
    svgY: 185,
    zoneId: 'zone-north-hostels',
  },
  bh5: {
    id: 'bh5',
    name: 'Boys Hostel 5 (BH-5)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-05',
    description: 'Mid-south residential quad adjacent to the central green lawns.',
    svgX: 1300,
    svgY: 2440,
    zoneId: 'zone-south-hostels',
  },
  bh8: {
    id: 'bh8',
    name: 'Boys Hostel 8 (BH-8)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-08',
    description: 'South-east residential hostel with adjoining study spaces.',
    svgX: 1415,
    svgY: 2235,
    zoneId: 'zone-south-hostels',
  },
  BH8: {
    id: 'BH8',
    name: 'Boys Hostel 8 (BH-8)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-08',
    description: 'South-east residential hostel with adjoining study spaces.',
    svgX: 1415,
    svgY: 2235,
    zoneId: 'zone-south-hostels',
  },
  bh9: {
    id: 'bh9',
    name: 'Boys Hostel 9 (BH-9)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-09',
    description: 'Deep south hostel block near the athletics field and trail.',
    svgX: 1445,
    svgY: 2645,
    zoneId: 'zone-south-hostels',
  },
  bh10: {
    id: 'bh10',
    name: 'Boys Hostel 10 (BH-10)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-10',
    description: 'South-west residential complex overlooking the stadium approach.',
    svgX: 1245,
    svgY: 2635,
    zoneId: 'zone-south-hostels',
  },
  bh12: {
    id: 'bh12',
    name: 'Boys Hostel 12 (BH-12)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-12',
    description: 'Large residential facility on the south-west perimeter avenue.',
    svgX: 980,
    svgY: 2500,
    zoneId: 'zone-south-hostels',
  },
  bh1: {
    id: 'bh1',
    name: 'Boys Hostel 1 (BH-1)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-01',
    description: 'North perimeter residential hall near the campus transit gate.',
    svgX: 520,
    svgY: 180,
    zoneId: 'zone-north-hostels',
  },
  bh3: {
    id: 'bh3',
    name: 'Boys Hostel 3 (BH-3)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-03',
    description: 'North residential pavilion bordering the garden pathway.',
    svgX: 620,
    svgY: 160,
    zoneId: 'zone-north-hostels',
  },
  bh4: {
    id: 'bh4',
    name: 'Boys Hostel 4 (BH-4)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-04',
    description: 'South-east residential block with study courtyard.',
    svgX: 1350,
    svgY: 2380,
    zoneId: 'zone-south-hostels',
  },
  bh6: {
    id: 'bh6',
    name: 'Boys Hostel 6 (BH-6)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-06',
    description: 'Multi-wing residential quad with recreation lounge.',
    svgX: 1265,
    svgY: 2170,
    zoneId: 'zone-south-hostels',
  },
  bh11: {
    id: 'bh11',
    name: 'Boys Hostel 11 (BH-11)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-11',
    description: 'South residential facility located between BH-10 and BH-12.',
    svgX: 1100,
    svgY: 2600,
    zoneId: 'zone-south-hostels',
  },
  'Vector 25': {
    id: 'Vector 25',
    name: 'Boys Hostel 6 / Complex',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-06',
    description: 'Multi-wing residential wing with recreation lounge.',
    svgX: 1265,
    svgY: 2170,
    zoneId: 'zone-south-hostels',
  },

  // Lecture Halls
  lh1: {
    id: 'lh1',
    name: 'Lecture Hall 1 (LH-1 / LH-4)',
    category: 'lecture_hall',
    categoryLabel: 'LECTURE HALL',
    code: 'LH-01',
    description: 'Tiered amphitheater lecture complex for large foundation courses.',
    svgX: 578,
    svgY: 1845,
    zoneId: 'zone-sports-arena',
  },
  lh4: {
    id: 'lh4',
    name: 'Lecture Hall 4 (LH-4)',
    category: 'lecture_hall',
    categoryLabel: 'LECTURE HALL',
    code: 'LH-04',
    description: 'Tiered multi-media lecture hall connected to LH-1 complex.',
    svgX: 590,
    svgY: 1845,
    zoneId: 'zone-sports-arena',
  },
  lh2: {
    id: 'lh2',
    name: 'Lecture Hall 2 (LH-2)',
    category: 'lecture_hall',
    categoryLabel: 'LECTURE HALL',
    code: 'LH-02',
    description: 'Multi-tiered smart lecture hall and audio-visual hall.',
    svgX: 820,
    svgY: 2115,
    zoneId: 'zone-south-hostels',
  },
  lh3: {
    id: 'lh3',
    name: 'Lecture Hall 3 (LH-3)',
    category: 'lecture_hall',
    categoryLabel: 'LECTURE HALL',
    code: 'LH-03',
    description: 'Modern academic hall connected to south tech laboratories.',
    svgX: 1085,
    svgY: 2170,
    zoneId: 'zone-south-hostels',
  },
  lh5: {
    id: 'lh5',
    name: 'North Lecture Pavilion (LH-5)',
    category: 'lecture_hall',
    categoryLabel: 'LECTURE HALL',
    code: 'LH-05',
    description: 'North academic pavilion and seminar hall.',
    svgX: 670,
    svgY: 55,
    zoneId: 'zone-north-hostels',
  },

  // Academic & Labs
  'center of datascience': {
    id: 'center of datascience',
    name: 'Center of Data Science',
    category: 'academic',
    categoryLabel: 'TECH & RESEARCH HUB',
    code: 'CDS-01',
    description: 'High-performance computing clusters, AI laboratories, and glass concourse.',
    svgX: 865,
    svgY: 611,
    zoneId: 'zone-academic-core',
  },
  'Vector 12': {
    id: 'Vector 12',
    name: 'Academic Block A (Core)',
    category: 'academic',
    categoryLabel: 'ACADEMIC COMPLEX',
    code: 'ACAD-01',
    description: 'Primary academic core housing departmental deans, seminar halls, and studios.',
    svgX: 435,
    svgY: 655,
    zoneId: 'zone-academic-core',
  },
  'Vector 35': {
    id: 'Vector 35',
    name: 'B-Block (Engineering Lab)',
    category: 'academic',
    categoryLabel: 'ENGINEERING LABS',
    code: 'ENG-B',
    description: 'Engineering laboratories and prototyping workshop.',
    svgX: 715,
    svgY: 612,
    zoneId: 'zone-academic-core',
  },
  'Vector 14': {
    id: 'Vector 14',
    name: 'Innovation & Research Wing',
    category: 'academic',
    categoryLabel: 'RESEARCH COMPLEX',
    code: 'RES-14',
    description: 'Interdisciplinary science and technology incubation facility.',
    svgX: 935,
    svgY: 800,
    zoneId: 'zone-academic-core',
  },
  'c-block': {
    id: 'c-block',
    name: 'C-Block (Sciences & Computing)',
    category: 'academic',
    categoryLabel: 'DEPARTMENT BLOCK',
    code: 'DEP-C',
    description: 'Computer science departments, computational labs, and faculty wings.',
    svgX: 710,
    svgY: 970,
    zoneId: 'zone-central-blocks',
  },
  'd-block': {
    id: 'd-block',
    name: 'D-Block (Design & Humanities)',
    category: 'academic',
    categoryLabel: 'DEPARTMENT BLOCK',
    code: 'DEP-D',
    description: 'Design studios, conference suites, and central courtyard sundial.',
    svgX: 330,
    svgY: 1260,
    zoneId: 'zone-central-blocks',
  },
  eblock: {
    id: 'eblock',
    name: 'E-Block (Electronics & Robotics)',
    category: 'academic',
    categoryLabel: 'DEPARTMENT BLOCK',
    code: 'DEP-E',
    description: 'Robotics arenas, hardware prototyping hubs, and electronic design labs.',
    svgX: 868,
    svgY: 1490,
    zoneId: 'zone-central-blocks',
  },
  'f-block': {
    id: 'f-block',
    name: 'F-Block (BioTech & Media)',
    category: 'academic',
    categoryLabel: 'DEPARTMENT BLOCK',
    code: 'DEP-F',
    description: 'Bio-engineering laboratories, cleanrooms, and media center.',
    svgX: 1050,
    svgY: 1220,
    zoneId: 'zone-central-blocks',
  },
  'sc-block': {
    id: 'sc-block',
    name: 'G-Block / SC Complex',
    category: 'academic',
    categoryLabel: 'STUDENT CENTER',
    code: 'SC-G',
    description: 'Student clubs, society rooms, and collaborative maker lounge.',
    svgX: 760,
    svgY: 1185,
    zoneId: 'zone-central-blocks',
  },
  library: {
    id: 'library',
    name: 'Central Campus Library',
    category: 'facility',
    categoryLabel: 'LIBRARY & STUDY',
    code: 'LIB-01',
    description: 'Four-level digital archive, quiet study halls, and research library.',
    svgX: 535,
    svgY: 1275,
    zoneId: 'zone-central-blocks',
  },
  studentsection: {
    id: 'studentsection',
    name: 'Student Section & Admin Hub',
    category: 'admin',
    categoryLabel: 'CAMPUS ADMINISTRATION',
    code: 'ADM-01',
    description: 'Registrar, campus student affairs, and central admissions gateway.',
    svgX: 330,
    svgY: 450,
    zoneId: 'zone-academic-core',
  },

  // Sports & Courts
  'indoor stadium': {
    id: 'indoor stadium',
    name: 'Indoor Sports Stadium',
    category: 'sports',
    categoryLabel: 'SPORTS ARENA',
    code: 'STA-01',
    description: 'Full-size basketball hardwood courts, badminton suites, and spectator stands.',
    svgX: 1100,
    svgY: 980,
    zoneId: 'zone-academic-core',
  },
  'football-court1': {
    id: 'football-court1',
    name: 'Football Court 1 (North Turf)',
    category: 'sports',
    categoryLabel: 'ATHLETICS FIELD',
    code: 'FT-01',
    description: 'Championship turf pitch with floodlights and spectator concourse.',
    svgX: 705,
    svgY: 775,
    zoneId: 'zone-academic-core',
  },
  'football-court2': {
    id: 'football-court2',
    name: 'Football Court 2 (South Arena)',
    category: 'sports',
    categoryLabel: 'ATHLETICS FIELD',
    code: 'FT-02',
    description: 'South athletics ground with running track and sports pavilion.',
    svgX: 1345,
    svgY: 2825,
    zoneId: 'zone-south-hostels',
  },
  'cricket-court1': {
    id: 'cricket-court1',
    name: 'Cricket Court 1',
    category: 'sports',
    categoryLabel: 'ATHLETICS FIELD',
    code: 'CRK-01',
    description: 'Regulation cricket pitch with west tree line and sightscreens.',
    svgX: 390,
    svgY: 1620,
    zoneId: 'zone-sports-arena',
  },
  gym: {
    id: 'gym',
    name: 'Campus Gymnasium & Fitness Hub',
    category: 'sports',
    categoryLabel: 'FITNESS & GYM',
    code: 'GYM-01',
    description: 'Weight training suites, cardio decks, and fitness studios.',
    svgX: 48,
    svgY: 1270,
    zoneId: 'zone-central-blocks',
  },

  // Dining & Facilities
  'food-court': {
    id: 'food-court',
    name: 'Food Court & Dining Plaza',
    category: 'dining',
    categoryLabel: 'CAMPUS DINING',
    code: 'FC-01',
    description: 'Multi-cuisine campus dining arcade with outdoor terrace seating.',
    svgX: 1335,
    svgY: 1315,
    zoneId: 'zone-central-blocks',
  },
  'Vector 18': {
    id: 'Vector 18',
    name: 'North Dining Pavilion & Auditorium',
    category: 'dining',
    categoryLabel: 'DINING & PAVILION',
    code: 'DIN-01',
    description: 'Main residential dining commons with connected auditorium foyer.',
    svgX: 568,
    svgY: 375,
    zoneId: 'zone-north-hostels',
  },
  garden: {
    id: 'garden',
    name: 'Central Botanical Garden',
    category: 'facility',
    categoryLabel: 'GARDEN & PARK',
    code: 'GRD-01',
    description: 'Landscaped campus lawn with shaded walkways and stone benches.',
    svgX: 806,
    svgY: 1625,
    zoneId: 'zone-sports-arena',
  },
  'drive-ev': {
    id: 'drive-ev',
    name: 'EV Drive & Solar Charging Station',
    category: 'facility',
    categoryLabel: 'CAMPUS MOBILITY',
    code: 'EV-01',
    description: 'Eco-friendly transit stop with rapid EV charging bays.',
    svgX: 1186,
    svgY: 1385,
    zoneId: 'zone-central-blocks',
  },
  playground: {
    id: 'playground',
    name: 'Campus Playground & Recreation Park',
    category: 'facility',
    categoryLabel: 'CAMPUS PLAYGROUND',
    code: 'PLY-01',
    description: 'Recreation ground with park equipment, open greens, and walking circuit.',
    svgX: 1250,
    svgY: 1195,
    zoneId: 'zone-central-blocks',
  },
  unknown1: {
    id: 'unknown1',
    name: 'East Campus Activity Pavilion',
    category: 'facility',
    categoryLabel: 'ACTIVITY PAVILION',
    code: 'PAV-01',
    description: 'Multi-purpose student activity pavilion and sheltered terrace overlooking central avenue.',
    svgX: 1245,
    svgY: 1910,
    zoneId: 'zone-south-hostels',
  },

  // Canonical Aliases for Flexible Referencing
  'academic-block': {
    id: 'academic-block',
    name: 'Academic Block',
    category: 'academic',
    categoryLabel: 'ACADEMIC COMPLEX',
    code: 'ACAD-01',
    description: 'Primary academic core housing departmental deans, seminar halls, and studios.',
    svgX: 435,
    svgY: 655,
    zoneId: 'zone-academic-core',
  },
  'b-block': {
    id: 'b-block',
    name: 'B-Block',
    category: 'academic',
    categoryLabel: 'ENGINEERING LABS',
    code: 'ENG-B',
    description: 'Engineering laboratories and prototyping workshop.',
    svgX: 715,
    svgY: 612,
    zoneId: 'zone-academic-core',
  },
  'e-block': {
    id: 'eblock',
    name: 'E-Block',
    category: 'academic',
    categoryLabel: 'DEPARTMENT BLOCK',
    code: 'DEP-E',
    description: 'Robotics arenas, hardware prototyping hubs, and electronic design labs.',
    svgX: 868,
    svgY: 1490,
    zoneId: 'zone-central-blocks',
  },
  'g-block': {
    id: 'G-block',
    name: 'G-Block',
    category: 'academic',
    categoryLabel: 'STUDENT CENTER',
    code: 'SC-G',
    description: 'Student clubs, society rooms, and collaborative maker lounge.',
    svgX: 760,
    svgY: 1185,
    zoneId: 'zone-central-blocks',
  },
  'G-block': {
    id: 'G-block',
    name: 'G-Block',
    category: 'academic',
    categoryLabel: 'STUDENT CENTER',
    code: 'SC-G',
    description: 'Student clubs, society rooms, and collaborative maker lounge.',
    svgX: 760,
    svgY: 1185,
    zoneId: 'zone-central-blocks',
  },
  'G-Block': {
    id: 'G-block',
    name: 'G-Block',
    category: 'academic',
    categoryLabel: 'STUDENT CENTER',
    code: 'SC-G',
    description: 'Student clubs, society rooms, and collaborative maker lounge.',
    svgX: 760,
    svgY: 1185,
    zoneId: 'zone-central-blocks',
  },
  auditorium: {
    id: 'auditorium',
    name: 'Auditorium',
    category: 'dining',
    categoryLabel: 'AUDITORIUM & DINING',
    code: 'AUD-01',
    description: 'Main residential dining commons with connected auditorium foyer.',
    svgX: 568,
    svgY: 375,
    zoneId: 'zone-north-hostels',
  },
  'bh-7': {
    id: 'bh7',
    name: 'Boys Hostel 7 (BH-7)',
    category: 'hostel',
    categoryLabel: 'HOSTEL RESIDENCE',
    code: 'BH-07',
    description: 'North hostel block with central courtyard garden and stone promenade.',
    svgX: 385,
    svgY: 137,
    zoneId: 'zone-north-hostels',
  },
  'center-of-datascience': {
    id: 'center of datascience',
    name: 'Center of Data Science',
    category: 'academic',
    categoryLabel: 'TECH & RESEARCH HUB',
    code: 'CDS-01',
    description: 'High-performance computing clusters, AI laboratories, and glass concourse.',
    svgX: 865,
    svgY: 611,
    zoneId: 'zone-academic-core',
  },
  'indoor-stadium': {
    id: 'indoor stadium',
    name: 'Indoor Stadium',
    category: 'sports',
    categoryLabel: 'SPORTS ARENA',
    code: 'STA-01',
    description: 'Full-size basketball hardwood courts, badminton suites, and spectator stands.',
    svgX: 1100,
    svgY: 980,
    zoneId: 'zone-academic-core',
  },
  'football court 2': {
    id: 'football-court2',
    name: 'Football Court 2',
    category: 'sports',
    categoryLabel: 'ATHLETICS FIELD',
    code: 'FT-02',
    description: 'South athletics ground with running track and sports pavilion.',
    svgX: 1345,
    svgY: 2825,
    zoneId: 'zone-south-hostels',
  },
};

/**
 * Get Landmark definition by SVG ID (with fallback matching)
 */
export function getLandmarkById(id: string): CampusLandmark | null {
  if (CAMPUS_LANDMARKS[id]) {
    return CAMPUS_LANDMARKS[id];
  }

  // Normalized matching (lowercase, hyphen/space variations)
  const cleanId = id.toLowerCase().replace(/[\s_-]+/g, '');
  for (const [key, landmark] of Object.entries(CAMPUS_LANDMARKS)) {
    const cleanKey = key.toLowerCase().replace(/[\s_-]+/g, '');
    if (cleanKey === cleanId) {
      return landmark;
    }
  }

  return null;
}

/**
 * Maps any user/code landmark ID to the physical SVG element ID that should be highlighted
 */
export function getSvgHighlightTargetId(landmarkId: string): string {
  const map: Record<string, string> = {
    bh1: 'bh2',
    bh2: 'bh2',
    bh3: 'bh2',
    bh4: 'bh5',
    bh5: 'bh5',
    bh6: 'bh6',
    'Vector 25': 'bh6',
    bh7: 'bh7',
    bh8: 'bh8',
    BH8: 'bh8',
    bh9: 'bh9',
    bh10: 'bh10',
    bh11: 'bh12',
    bh12: 'bh12',
    lh1: 'lh1',
    lh4: 'lh1',
    lh2: 'lh2',
    lh3: 'lh3',
    lh5: 'lh5',
    'academic-block': 'academic-block',
    'Vector 12': 'academic-block',
    'b-block': 'b-block',
    'Vector 35': 'b-block',
    'c-block': 'c-block',
    'd-block': 'd-block',
    eblock: 'eblock',
    'e-block': 'eblock',
    'f-block': 'f-block',
    'G-block': 'G-block',
    'g-block': 'G-block',
    'sc-block': 'G-block',
    library: 'library',
    'food-court': 'food-court',
    auditorium: 'auditorium',
    'Vector 18': 'auditorium',
    gym: 'gym',
    'indoor stadium': 'indoor stadium',
    'indoor-stadium': 'indoor stadium',
    'cricket-court1': 'cricket-court1',
    'football-court1': 'football-court1',
    'football-court2': 'football-court2',
    'center of datascience': 'center of datascience',
    'center-of-datascience': 'center of datascience',
  };
  return map[landmarkId] || landmarkId;
}

/**
 * Find the single nearest active spawn to a landmark
 */
export function getNearestActiveSpawn(
  landmark: CampusLandmark,
  spawns: SpawnPoint[]
): { spawn: SpawnPoint; distanceMeters: number } | null {
  const activeSpawns = spawns.filter((s) => s.status === 'active' && s.enabled !== false);
  if (activeSpawns.length === 0) return null;

  let bestSpawn: SpawnPoint | null = null;
  let minDistance = Infinity;

  for (const spawn of activeSpawns) {
    const dx = spawn.svgX - landmark.svgX;
    const dy = spawn.svgY - landmark.svgY;
    const dist = Math.hypot(dx, dy);
    if (dist < minDistance) {
      minDistance = dist;
      bestSpawn = spawn;
    }
  }

  if (!bestSpawn) return null;
  // SVG coords to real-world meters approximation (~0.35m per SVG coordinate unit)
  const approxMeters = Math.max(12, Math.round(minDistance * 0.35));
  return { spawn: bestSpawn, distanceMeters: approxMeters };
}

/**
 * Find active spawns near a landmark in SVG coordinate space
 */
export function getNearbySpawnsForLandmark(
  landmark: CampusLandmark,
  spawns: SpawnPoint[],
  maxSvgDistance: number = 180
): SpawnPoint[] {
  return spawns.filter((spawn) => {
    if (spawn.status !== 'active' || spawn.enabled === false) return false;

    // Direct zone match or Euclidean SVG proximity
    const dx = spawn.svgX - landmark.svgX;
    const dy = spawn.svgY - landmark.svgY;
    const distSvg = Math.sqrt(dx * dx + dy * dy);

    return distSvg <= maxSvgDistance || spawn.zoneId === landmark.zoneId;
  });
}
