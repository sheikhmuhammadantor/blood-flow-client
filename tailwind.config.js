/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blood: '#ff0302',
        lightGreen: '#1a7e42',
      },
    },
  },
  plugins: [daisyui],
};
