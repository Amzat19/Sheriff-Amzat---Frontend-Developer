import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    minify: 'terser', // Use 'terser' for minification
    terserOptions: {
      // Customize minification options here
      mangle: false, // Disable mangling of function names
    },
  },
});
