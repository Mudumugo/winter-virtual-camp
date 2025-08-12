import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 12000,
    cors: true,
    allowedHosts: ["work-1-rlkelbwzylyivuux.prod-runtime.all-hands.dev", "work-2-rlkelbwzylyivuux.prod-runtime.all-hands.dev"],
    headers: {
      "X-Frame-Options": "ALLOWALL",
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
