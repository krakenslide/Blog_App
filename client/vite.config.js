import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": "https://blog-app-8j8t.onrender.com",
    },
  },
  plugins: [react()],
});
