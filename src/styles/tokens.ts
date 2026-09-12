/**
 * Project I9 Design Tokens
 * Strictly locked to specification and wireframe source of truth.
 */

export const COLORS = {
  // Core Documented Brand Colors
  warmWhite: '#FBF6EE',
  nearBlack: '#1A1310',
  softOrange: '#FBEEE1',
  brightOrange: '#F16321',

  // Derived Neutrals & Accents
  orangeDark: '#D44E11',
  orangeLight: '#FDE8D7',
  borderSubtle: '#EADBC8',
  borderDark: '#322520',
  mutedText: '#70625B',
  mutedLight: '#9B8C84',

  // Dark Surface Accents (for admin / night mode / contrast shells)
  surfaceDark: '#231B17',
  surfaceDarkHover: '#2E231E',
  surfaceCard: '#FAF4EB',

  // Status & Game Feedback
  status: {
    active: '#F16321',
    claimed: '#70625B',
    expired: '#9B8C84',
    success: '#2E7D32',
    warning: '#ED6C02',
    error: '#D32F2F',
    cooldown: '#5C544F',
  },

  // Spawn Point Tiers
  tier: {
    tier1: {
      name: 'Common',
      color: '#70625B',
      bg: '#EADBC8',
      accent: '#1A1310',
    },
    tier2: {
      name: 'Rare',
      color: '#D44E11',
      bg: '#FBEEE1',
      accent: '#F16321',
    },
    tier3: {
      name: 'Epic',
      color: '#F16321',
      bg: '#FDE8D7',
      accent: '#D44E11',
    },
    tier4: {
      name: 'Legendary',
      color: '#1A1310',
      bg: '#F16321',
      accent: '#FBF6EE',
    },
  },
} as const;

export const TYPOGRAPHY = {
  fontDisplay: "'Space Grotesk', system-ui, -apple-system, sans-serif",
  fontBody: "'Inter', system-ui, -apple-system, sans-serif",
  scale: {
    displayLg: '32px',
    displayMd: '24px',
    displaySm: '20px',
    title: '18px',
    bodyLg: '16px',
    bodyMd: '14px',
    caption: '12px',
    micro: '10px',
  },
} as const;

export const VIEWPORT = {
  canonical: {
    width: 375,
    height: 812,
  },
  supportedWidths: [375, 390, 393, 412] as const,
  touchTargetMin: 44, // 44px min touch target
} as const;

export const RADIUS = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const SHADOWS = {
  subtle: '0 1px 3px rgba(26, 19, 16, 0.06)',
  card: '0 2px 8px rgba(26, 19, 16, 0.08)',
  elevated: '0 8px 24px rgba(26, 19, 16, 0.12)',
  pin: '0 4px 12px rgba(241, 99, 33, 0.35)',
} as const;

export const Z_INDEX = {
  mapBase: 1,
  mapPolygons: 5,
  mapPins: 10,
  playerMarker: 15,
  mapControls: 20,
  topBar: 30,
  bottomBar: 40,
  bottomSheet: 50,
  modal: 60,
  toast: 70,
} as const;

/**
 * Campus Map Vector Palette
 * Sourced strictly from MAP SVG/Group 2-2.svg
 * 
 * Geometry and line values:
 * - outline: #000000
 * - campus base: #F8F3EA (or existing cream #FBF6EE)
 * - lawn: #9ACA4E
 * - terracotta: #C97B5C
 * - blue-grey: #5B7C99
 * - sports green: #7A9B76
 * - lavender: #A78BA8
 * - pink: #F5B4E3
 * - gold: #D9A441
 * - aqua: #30CFCF
 * 
 * Reserved for Active Game State:
 * - #F16321: spawn pins, current location, claim CTA, and selected landmark outline
 */
export const MAP_PALETTE = {
  // Line & Base
  outline: '#000000',
  campusBase: '#F8F3EA',
  campusBaseAlt: '#FBF6EE',

  // Architectural & Ground Fills from Group 2-2.svg
  lawn: '#9ACA4E',
  terracotta: '#C97B5C',
  blueGrey: '#5B7C99',
  sportsGreen: '#7A9B76',
  lavender: '#A78BA8',
  pink: '#F5B4E3',
  gold: '#D9A441',
  aqua: '#30CFCF',
  roadNetwork: '#D9D9D9',

  // Reserved strictly for active game state
  activeGameState: {
    highlight: '#F16321', // Spawn pins, current location, claim CTA, selected landmark outline
    glow: 'rgba(241, 99, 33, 0.85)',
  },

  // Category Color Mappings for Map-Adjacent States & Legend/Detail Badges
  categories: {
    hostel: {
      fill: '#C97B5C',
      color: '#9C5538',
      bg: '#FAF0EB',
      border: '#E8D0C5',
      name: 'Hostels',
      description: 'Hostel residences BH-1 through BH-12',
    },
    lecture_hall: {
      fill: '#F5B4E3',
      color: '#B04B92',
      bg: '#FDF2FA',
      border: '#F6CEE9',
      name: 'Lecture Halls',
      description: 'Amphitheaters LH-1 through LH-5',
    },
    academic: {
      fill: '#5B7C99',
      color: '#3B5974',
      bg: '#EFF4F8',
      border: '#C5D6E4',
      name: 'Academic & Labs',
      description: 'Center of Data Science, C/D/F/SC blocks',
    },
    sports: {
      fill: '#7A9B76',
      color: '#497345',
      bg: '#EFF6EE',
      border: '#C8DEC6',
      name: 'Sports & Arena',
      description: 'Indoor stadium, football & cricket courts',
    },
    dining: {
      fill: '#D9A441',
      color: '#966B14',
      bg: '#FDF8EC',
      border: '#F3E1B8',
      name: 'Dining Arcade',
      description: 'Food court & dining pavilions',
    },
    facility: {
      fill: '#A78BA8',
      color: '#654D69',
      bg: '#F6F2F7',
      border: '#DACFE0',
      name: 'Campus Facility',
      description: 'Gymnasium, pavilions, maker workshops',
    },
    admin: {
      fill: '#5B7C99',
      color: '#3B5974',
      bg: '#EFF4F8',
      border: '#C5D6E4',
      name: 'Administration',
      description: 'Student affairs & admissions gateway',
    },
    lawn: {
      fill: '#9ACA4E',
      color: '#5C8222',
      bg: '#F3F9EA',
      border: '#D0E6B0',
      name: 'Parks & Lawns',
      description: 'Botanical garden & campus greenways',
    },
    transit: {
      fill: '#30CFCF',
      color: '#158484',
      bg: '#EAF9F9',
      border: '#B3ECEC',
      name: 'EV Transit',
      description: 'Electric mobility & solar charging bays',
    },
  },
} as const;

export type MapPaletteCategoryKey = keyof typeof MAP_PALETTE.categories;

/**
 * Resolve landmark category token with specialized overrides for unique SVG landmark IDs
 */
export function getLandmarkCategoryToken(category: string, landmarkId?: string) {
  if (landmarkId === 'garden') return MAP_PALETTE.categories.lawn;
  if (landmarkId === 'drive-ev') return MAP_PALETTE.categories.transit;
  if (landmarkId === 'gym') return MAP_PALETTE.categories.facility;
  return (
    MAP_PALETTE.categories[category as MapPaletteCategoryKey] ||
    MAP_PALETTE.categories.academic
  );
}
