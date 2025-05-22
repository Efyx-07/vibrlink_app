/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx,mdx}'];
export const theme = {
  extend: {
    colors: {
      darkColor: 'var(--darkColor)',
      darkColorRelief: 'var(--darkColorRelief)',
      darkColor75: 'var(--darkColor75)',
      whiteColor: 'var(--whiteColor)',
      whiteLight: 'var(--whiteLight)',
      whiteLight25: 'var(--whiteLight25)',
      accentColor: 'var(--accentColor)',
      accentColor05: 'var(--accentColor05)',
      accentColor25: 'var(--accentColor25)',
      accentColor5: 'var(--accentColor5)',
      errorColor: 'var(--errorColor)',
      blackOverlay75: 'var(--blackOverlay75)',
    },
  },
  plugins: [],
};
