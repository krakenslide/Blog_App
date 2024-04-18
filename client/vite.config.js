import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://blog-app-f85t.onrender.com",
        secure: true,
      },
    },
  },
  plugins: [react()],
});
