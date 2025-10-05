/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      all: true,
      exclude: [
        "**/node_modules/**",
        "**/tests/**",
        "vite.config.ts",
        "vitest.config.ts",
        "tsconfig*.json",
        "**/*.d.ts",
        "src/setupTests.ts",
        "eslint.config.js",
        "src/main.tsx"
      ]
    }
  },
});
