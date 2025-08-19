export const tokens = {
  colors: {
    dark: {
      bg: '#0f1115',
      surface: '#151821',
      panel: '#191d27',
      text: '#E6E8EC',
      muted: '#9AA3AF',
      border: '#2A2F3A',
      accent: '#8EA6C8',
      accent600: '#6E8CB3',
      accent700: '#5A7597',
    },
    light: {
      bg: '#FAFBFC',
      surface: '#FFFFFF',
      panel: '#F5F7FA',
      text: '#1A202C',
      muted: '#4A5568',
      border: '#E2E8F0',
      accent: '#5A7597',
      accent600: '#4A6487',
      accent700: '#3A5477',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },
  radii: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    pill: '999px',
  },
  shadows: {
    card: '0 10px 30px rgba(0, 0, 0, 0.25)',
    cardHover: '0 20px 40px rgba(0, 0, 0, 0.3)',
    button: '0 2px 8px rgba(0, 0, 0, 0.15)',
    nav: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '150ms',
    base: '250ms',
    slow: '400ms',
    slower: '600ms',
  },
  typography: {
    display1: {
      fontSize: '4rem',
      lineHeight: '4.5rem',
      letterSpacing: '-0.02em',
      fontWeight: 700,
    },
    display2: {
      fontSize: '2.75rem',
      lineHeight: '3.25rem',
      letterSpacing: '-0.01em',
      fontWeight: 600,
    },
    display3: {
      fontSize: '1.75rem',
      lineHeight: '2.25rem',
      letterSpacing: '-0.01em',
      fontWeight: 600,
    },
    body: {
      fontSize: '1rem',
      lineHeight: '1.75rem',
      fontWeight: 400,
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
      fontWeight: 400,
    },
    mono: {
      fontSize: '0.8125rem',
      lineHeight: '1.25rem',
      fontWeight: 500,
    },
  },
  animation: {
    easing: {
      smooth: [0.22, 1, 0.36, 1],
      spring: { type: 'spring', stiffness: 220, damping: 26 },
    },
    durations: {
      instant: 0,
      fast: 200,
      normal: 400,
      slow: 600,
      ambient: 8000,
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
  },
} as const

export type Tokens = typeof tokens