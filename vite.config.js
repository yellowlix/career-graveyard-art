import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "copy-root-static-assets",
      closeBundle() {
        ["robots.txt", "sitemap.xml", "favicon.svg"].forEach((filename) => {
          const source = resolve(__dirname, filename);
          const destination = resolve(__dirname, "dist", filename);

          if (existsSync(source)) {
            copyFileSync(source, destination);
          }
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        archive: resolve(__dirname, "archive.html"),
        career: resolve(__dirname, "career.html"),
        memorial: resolve(__dirname, "memorial.html"),
        about: resolve(__dirname, "about.html"),
        notFound: resolve(__dirname, "404.html")
      }
    }
  }
});
