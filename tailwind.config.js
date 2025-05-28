/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx,mdx}'];
export const theme = {
  extend: {
    height: {
      'screen-minus-10': 'calc(100dvh - 10rem)',
      'screen-minus-18': 'calc(100dvh - 18rem)',
    },
    minHeight: {
      'screen-minus-10': 'calc(100dvh - 10rem)',
    },
    colors: {
      darkColor: 'var(--darkColor)',
      darkColorRelief: 'var(--darkColorRelief)',
      darkColor75: 'var(--darkColor75)',
      whiteColor: 'var(--whiteColor)',
      whiteLight: 'var(--whiteLight)',
      whiteLight25: 'var(--whiteLight25)',
      whiteLight50: 'var(--whiteLight50)',
      accentColor: 'var(--accentColor)',
      accentColor05: 'var(--accentColor05)',
      accentColor25: 'var(--accentColor25)',
      accentColor5: 'var(--accentColor5)',
      errorColor: 'var(--errorColor)',
      errorColor05: 'var(--errorColor05)',
      errorColor25: 'var(--errorColor25)',
      errorColor5: 'var(--errorColor5)',
      blackOverlay75: 'var(--blackOverlay75)',
    },
  },
  plugins: [],
};
