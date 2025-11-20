import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // puerto que querés exponer
    host: true, // permite acceso desde fuera del contenedor
    watch: {
      usePolling: true, // importante para Docker
    },
  },
  plugins: [react(), tailwindcss()],
});
