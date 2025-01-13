import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import dotenv from "dotenv";

console.log(process.env.VITE_MAIN_API)
dotenv.config()
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    proxy: {
      "/main/": {
        target: process.env.VITE_MAIN_API,
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
