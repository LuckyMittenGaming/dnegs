import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        shop: resolve(__dirname, 'shop.html'),
        blog: resolve(__dirname, 'blog.html')
      }
    }
  }
});
