import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: any[] = [react()];

  if (mode === "development") {
    try {
      const mod = await import("lovable-tagger");
      if (mod && typeof mod.componentTagger === "function") {
        plugins.push(mod.componentTagger());
      }
    } catch (err) {
      // If the optional dev-only package isn't available, skip gracefully.
      // This allows production builds where devDependencies are omitted.
      // eslint-disable-next-line no-console
      console.warn("lovable-tagger not available, skipping componentTagger plugin");
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
