/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 1px rgba(0, 255, 255, 0.8)", // You can adjust the color and blur radius here
      },
      backgroundImage: {
        'custom-gif': "url('public/images/galaxy.gif')",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.clip-slant': {
          clipPath: 'polygon(0% 0, 100% 0, 95% 100%, 0% 100%)',
        },
        '.box-shadow-custom': {
          boxShadow: 'inset 0px 0px 0px 2px white, 2px 0 0 0 white',
      },
      '.skewed-container-r': {
        transform: 'skewX(-30deg)', /* Apply the skew to the container */
      },
      
      '.inner-content-r': {
        transform: 'skewX(30deg)', /* Undo the skew on the text */
      },
      '.skewed-container-l': {
        transform: 'skewX(30deg)', /* Apply the skew to the container */
      },
      
      '.inner-content-l': {
        transform: 'skewX(-30deg)', /* Undo the skew on the text */
      },
    });
}),
  ],
}

