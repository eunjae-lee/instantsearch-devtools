import vite from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import path from "path";

const { defineConfig } = vite;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: path.resolve("src/lib/index.ts"),
      name: "InstantSearchDevTools",
      fileName: "index",
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
