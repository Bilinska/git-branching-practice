import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'ES2020',
    outDir: 'dist',
    lib: {
      entry: 'src/app.ts',
      name: 'ToDoApp',
      formats: ['iife'],
      fileName: (format) => `app.js`,
    },
    minify: 'terser',
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: true,
  },
});
