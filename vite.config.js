/// <reference types="vitest" />
import { defineConfig } from "vite";
export default defineConfig({
    server: {
        host: "localhost",
        port: 4200,
        strictPort: true,
        https: false,
        open: true,
        cors: false,
    },
    test: {
        globals: true,
        environment: "node",
    },
});
