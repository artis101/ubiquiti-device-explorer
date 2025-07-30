import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import path from "path";

const userBrowserslist =
  // loadConfig() returns the resolved Browserslist config (or undefined)
  // when a browserslist is found in package.json or a .browserslistrc file.
  // See Browserslist docs for the standard discovery rules.
  browserslist.loadConfig({ path: process.cwd() });

const fallbackQuery = "defaults and fully supports es6-module";
const resolvedQuery = userBrowserslist ?? fallbackQuery;

const lightningTargets = browserslistToTargets(browserslist(resolvedQuery));

export default defineConfig({
  plugins: [react(), tailwind()],

  define: {
    // Inject build timestamp at build time
    "import.meta.env.VITE_BUILD_TIMESTAMP": JSON.stringify(
      new Date().toISOString()
    ),
  },

  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: lightningTargets,
    },
  },
  build: {
    cssMinify: "lightningcss",
    target: "baseline-widely-available",
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      types: path.resolve(__dirname, "./src/types"),
    },
  },
});
