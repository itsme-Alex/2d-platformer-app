import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

console.log('Configuring Vite...');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './src/app',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  server: {
    port: 3010
  }
});
