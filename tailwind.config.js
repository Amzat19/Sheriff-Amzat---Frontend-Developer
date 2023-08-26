/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('/spacex-banner.webp')",
      },
    },
  },
  plugins: [],
};
