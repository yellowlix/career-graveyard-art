import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  fullyParallel: true,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    navigationTimeout: 45000
  },
  webServer: {
    command: "npm run dev -- -H 127.0.0.1 -p 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 120000
  },
  projects: [
    {
      name: "desktop-1440",
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 1080 },
        isMobile: false,
        hasTouch: false,
        deviceScaleFactor: 1
      }
    },
    {
      name: "desktop-1280",
      use: {
        browserName: "chromium",
        viewport: { width: 1280, height: 960 },
        isMobile: false,
        hasTouch: false,
        deviceScaleFactor: 1
      }
    },
    {
      name: "tablet-768",
      use: {
        browserName: "chromium",
        viewport: { width: 768, height: 1024 },
        isMobile: false,
        hasTouch: true,
        deviceScaleFactor: 1
      }
    },
    {
      name: "mobile-390",
      use: {
        ...devices["Pixel 7"],
        browserName: "chromium",
        viewport: { width: 390, height: 844 }
      }
    }
  ]
});
