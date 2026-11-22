import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Относительные пути: собранный dist/ можно выложить в любую папку,
  // в том числе как статический сайт в Yandex Object Storage
  base: './',
});
