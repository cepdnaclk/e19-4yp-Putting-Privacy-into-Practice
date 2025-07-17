import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0", // 👈 add this to listen on all interfaces
      port: 5173, // 👈 add this to ensure consistent port
      proxy: {
        "/api": {
          target: env.VITE_SERVER_BASE_URL, // ✅ works correctly
          changeOrigin: true,
        },
      },
    },
  };
});
