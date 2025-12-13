import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProd ? "/poke-play-collect/" : "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5174",
        changeOrigin: true,
      },
    },
  },
});
