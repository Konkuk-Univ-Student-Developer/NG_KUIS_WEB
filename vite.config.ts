import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import svgr from "vite-plugin-svgr";
import Unfonts from "unplugin-fonts/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    Unfonts({
      google: {
        families: [
          {
            name: "Noto Sans",
            styles: "wght@200;300;400;600;700",
          },
        ],
        display: "swap",
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/kupis": {
        target: "https://kupis.konkuk.ac.kr",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/kupis/, ""),
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (_proxyReq, req) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});
