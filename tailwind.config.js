
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',  // Extra small devices (portrait phones, less than 576px)
        'sm': '576px',  // Small devices (landscape phones, 576px and up)
        'md': '768px',  // Medium devices (tablets, 768px and up)
        'lg': '992px',  // Large devices (desktops, 992px and up)
        'xl': '1200px', // Extra large devices (large desktops, 1200px and up)
        '2xl': '1400px' // Extra extra large devices (larger desktops, 1400px and up)
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
