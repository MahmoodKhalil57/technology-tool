import { resolve } from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [svelte()],

    build: {
      outDir: "build",
    },

    publicDir: "static",

    resolve: {
      alias: {
        $lib: resolve("src/lib"),
      },
    },

    optimizeDeps: {
      exclude: ["codemirror", "@codemirror/language-html"],
    },
  };
});
