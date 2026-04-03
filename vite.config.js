import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        archive: resolve(__dirname, "archive.html"),
        career: resolve(__dirname, "career.html"),
        memorial: resolve(__dirname, "memorial.html"),
        about: resolve(__dirname, "about.html")
      }
    }
  }
});
