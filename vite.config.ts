import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [vue(),  svgLoader()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443,
    },
    allowedHosts: [
      ".ngrok-free.app",
      "localhost",
    ],
  },
  resolve: {               // <-- here
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
