/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind';

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './public/index.html',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'red-1': '#EB0000',
      'yellow-1': '#FFD600',
      'black-1': '#000000',
      'black-2': 'rgba(126, 126, 126, 0.9)', // 지도 편의시설 드롭다운
      'black-3': '#5B5B5B',
      'grey-1': '#828282',
      'grey-2': '#BABABA',
      'grey-3': '#D9D9D9',
      'grey-4': '#E6E6E6',
      'grey-5': '#F4F4F4',
      'grey-6': '#F7F7F7',
      'grey-7': 'rgba(240, 240, 240, 0.9)', // 지도 버튼 미클릭
      'grey-8': 'rgba(217, 217, 217, 0.9)', // 지도 버튼 클릭
      'white-1': '#FFFFFF',
      'white-2': 'rgba(255, 255, 255, 0.5)',
      'blue-1': '#004CC7',
      'blue-2': '#487FD7',
      'blue-3': '#91AFFF',
      'blue-4': '#DAE5F7',
      'dark-blue-1': '#0042AE',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      Cafe24Shiningstar: ['Cafe24Shiningstar'],
      'ClimateCrisisKR-1979': ['ClimateCrisisKR-1979'],
      'CWDangamAsac-Bold': ['CWDangamAsac-Bold'],
      NanumSquareRound: ['NanumSquareRound'],
      GyeonggiTitleM: ['GyeonggiTitleM'],
      'Pretendard-Bold': ['Pretendard-Bold'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
        customWidthPercent: '85%',
        customMargin: '1rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    flowbite.content(),
    function ({ addUtilities }) {
      addUtilities({
        '.scroll-hidden': {
          'scrollbar-width': 'none' /* Firefox */,
          '-ms-overflow-style': 'none' /* IE and Edge */,
        },
        '.scroll-hidden::-webkit-scrollbar': {
          display: 'none' /* Chrome, Safari, and Opera */,
        },
      });
    },
  ],
};
