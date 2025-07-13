import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
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
