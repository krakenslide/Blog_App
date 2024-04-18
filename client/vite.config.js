import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://blog-app-f85t.onrender.com",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
