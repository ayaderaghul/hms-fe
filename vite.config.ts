import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // "/api": "http://localhost:3001",
      "/api": "https://hms-be-szfc.onrender.com/",
    },
  },
});