import { defineConfig } from 'vite';

console.log('Vite configuration loaded for roomclass-app');
export default defineConfig({
  optimizeDeps: {
    exclude: [
      'sweetalert2',
      '@sweetalert2/ngx-sweetalert2',
    ],
  },
});