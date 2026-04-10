import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  preview: {
    allowedHosts: ["frontend-production-3f56.up.railway.app"],
  },
});
