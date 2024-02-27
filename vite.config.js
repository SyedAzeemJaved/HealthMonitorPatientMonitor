import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, './src/common'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@context': path.resolve(__dirname, './src/context'),
      '@navigation': path.resolve(__dirname, './src/navigation'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  plugins: [react()],
});
