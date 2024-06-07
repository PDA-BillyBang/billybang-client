import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // tsconfig.json의 "paths" 설정과 일치시킵니다.
      images: path.resolve(__dirname, "src/assets/image/icons"),
    },
  },
});
