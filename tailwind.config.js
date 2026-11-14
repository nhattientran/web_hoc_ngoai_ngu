/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        jp: ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', 'sans-serif'],
      },
      colors: {
        obsidian: '#08090D',
        warmbg: '#F6F6F4',
        surface: '#FFFFFF',
        mutedcard: '#EEEEEB',
        pastel: {
          blue: '#D5EAF7',
          'blue-deep': '#20638D',
          lavender: '#E5D9F7',
          'lavender-deep': '#5A3A8C',
          green: '#D2EED9',
          'green-deep': '#1F6A3B',
          yellow: '#F6E9B2',
          'yellow-deep': '#7C5E10',
          pink: '#F7DCE1',
          'pink-deep': '#8B2E48',
        },
      },
      borderRadius: {
        card: '22px',
        shell: '28px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(8, 9, 13, 0.04)',
        card: '0 2px 12px rgba(8, 9, 13, 0.05)',
        dock: '0 14px 36px rgba(8, 9, 13, 0.28)',
      },
    },
  },
  plugins: [],
};
