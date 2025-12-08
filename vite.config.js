import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxyPort = env.PROXY_PORT || "5174";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${proxyPort}`,
          changeOrigin: true,
        },
      },
    },
  };
});
