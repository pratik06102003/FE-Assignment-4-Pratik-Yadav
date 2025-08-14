export const BASE_FONT_SIZE = 16;

export const COLORS = {
  // Brand & primary UI
  PRIMARY_BLACK: '#0A0A0A', // #0A0A0A
  TEXT_PRIMARY: '#333333', // #333333
  TEXT_SECONDARY: '#555555', // #555555

  // Backgrounds
  BACKGROUND_PRIMARY: '#FFFFFF', // #FFFFFF
  BACKGROUND_SECONDARY: '#FAFAFA', // #FAFAFA

  // Borders & dividers
  BORDER_PRIMARY: '#E0E0E0', // #E0E0E0
  BORDER_SECONDARY: '#F0F0F0', // #F0F0F0

  // Links & interactive
  LINK_PRIMARY: '#1A8917', // #1A8917
  LINK_PRIMARY_HOVER: '#166F13', // #166F13

  // Feedback colors
  SUCCESS: '#28A745', // #28A745
  WARNING: '#FFC107', // #FFC107
  ERROR: '#DC3545', // #DC3545

  //highlights
  HIGHLIGHT: '#FFF9C4', // #FFF9C4}
} as const;

export const BREAKPOINTS = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1600,
} as const;

export const TYPOGRAPHY = {
  BASE_SIZE: 16,
  BASE_LINE_HEIGHT: 1.6,
  HEADINGS: {
    H1: { size: 36, lineHeight: 1.3 },
    H2: { size: 32, lineHeight: 1.35 },
    H3: { size: 28, lineHeight: 1.4 },
    H4: { size: 24, lineHeight: 1.45 },
    H5: { size: 20, lineHeight: 1.5 },
  },
} as const;
