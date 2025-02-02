import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import mkcert from 'vite-plugin-mkcert'; // SSL 인증서 자동 생성

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  server: {
    https: true, // ✅ HTTPS 활성화
    host: "localhost",
    port: 5173,
  },
});

