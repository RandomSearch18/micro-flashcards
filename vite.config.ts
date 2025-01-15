import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"
import { createHtmlPlugin } from "vite-plugin-html"

export default defineConfig({
  plugins: [
    viteSingleFile({
      removeViteModuleLoader: true,
    }),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: Infinity,
  },
})
