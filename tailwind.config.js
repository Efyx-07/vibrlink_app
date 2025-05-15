/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx,mdx}'];
export const theme = {
  extend: {
    colors: {
      darkColor: 'var(--darkColor)',
      darkColorRelief: 'var(--darkColorRelief)',
      whiteColor: 'var(--whiteColor)',
      whiteLight: 'var(--whiteLight)',
      accentColor: 'var(--accentColor)',
      errorColor: 'var(--errorColor)',
    },
  },
  plugins: [],
};
