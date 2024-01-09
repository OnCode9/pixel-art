import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // https://jasonwatmore.com/vue-3-vite-add-path-alias-to-src-in-vite-config
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }    
  }
})
