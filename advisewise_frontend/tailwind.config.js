/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        darkgray: '#2d3748',
        classTableHeader: 'rgba(235, 246, 255, 1)',
        white: '#FFFFFF',
        light_gray: '#f5f5f5',
        lighter_gray: '#fafafa',
        dark_gray: '#303638',
        blue: '#027df5',
        red: '#f50202',
        orange: '#f55f02',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
