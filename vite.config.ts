import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

const path = require("path");

const rawVersionNumber = require("./package.json").version;
let finalVersionNumber;

// Version number contains more than 2 dots, such as 2022.07.13.1
if ((rawVersionNumber.match(/\./g) || []).length > 2) {
  const versionDate = rawVersionNumber.substring(0, 10).replaceAll(".", "");
  const versionRev = rawVersionNumber.substring(
    rawVersionNumber.lastIndexOf(".") + 1,
    rawVersionNumber.length
  );
  finalVersionNumber = `${versionDate}.${versionRev}`;
}
// Backward compatibility (until all Git branches use the same version number format)
else {
  finalVersionNumber = rawVersionNumber;
}

// Expose app version as a global env var (used in particular by Sentry)
process.env.VUE_APP_VERSION = finalVersionNumber;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: {
    "process.env": {
      VUE_APP_VERSION: finalVersionNumber,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 8080,
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
});
