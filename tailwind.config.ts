import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx/**/*.{js,ts,jsx,tsx,mdx}', // Include MDX files if needed
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2.25rem', // text-3xl
              fontWeight: '700', // font-bold
              color: '#336699', // gray-800
              marginTop: '0',
              marginBottom: '1rem',
              lineHeight: '2.5rem', // leading-10
            },
            'ul > li::marker': {
              color: '#777', // change this to whatever you like
            },
            'ol > li::marker': {
              color: '#777', // change this to whatever you like
            },
          },
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
export default config;
