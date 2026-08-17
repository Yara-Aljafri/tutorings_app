/**
 * The IELTS design tokens, mirroring `assets/css/app.css` on the Phoenix side.
 */

export const colors = {
  ieltsRed: '#df1f26',
  ieltsOrange: '#f8b133',
  writingBlue: '#35a5dd',
  writingDarkBlue: '#2a84b0',
  listeningBlue: '#647fe8',
  readingGreen: '#79c698',
  readingDarkGreen: '#549d60',
  speakingPurple: '#8e81f2',
  brandNavy: '#2d3a84',
  muted: '#808080',
  track: '#d9d9d9',
  background: '#dbeafe',
  paper: '#e8edf7',
  card: '#ffffff',
  ink: '#111827',
  subtle: '#9ca3af',
  inactive: '#9ca3af',
  divider: '#e5e7eb',
} as const;

export type SectionSlug = 'listening' | 'reading' | 'writing' | 'speaking';

export const sectionColor: Record<SectionSlug | 'ielts', string> = {
  listening: colors.listeningBlue,
  reading: colors.readingGreen,
  writing: colors.writingBlue,
  speaking: colors.speakingPurple,
  ielts: colors.ieltsRed,
};

/** The colour the "General" toggle takes while it is not selected. */
export const variantColor: Record<string, string> = {
  ielts: colors.ieltsOrange,
  reading: colors.readingDarkGreen,
  writing: colors.writingDarkBlue,
};

/** Font Awesome names in the web app map onto these Ionicons. */
export const sectionIcon: Record<SectionSlug, 'headset' | 'book' | 'create' | 'mic'> = {
  listening: 'headset',
  reading: 'book',
  writing: 'create',
  speaking: 'mic',
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
} as const;

/** Arabic copy is right-aligned throughout the design. */
export const rtlText = {
  textAlign: 'right',
  writingDirection: 'rtl',
} as const;
