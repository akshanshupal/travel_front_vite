import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname, "");
    const rawMap = env.VITE_API_HOST as string | undefined;

    let proxyTarget = env.VITE_DEV_PROXY_TARGET as string | undefined;
    if (!proxyTarget && rawMap) {
        try {
            const map = JSON.parse(rawMap) as Record<string, string>;
            proxyTarget = map["http://localhost:5173"] || map["http://127.0.0.1:5173"] || Object.values(map)[0];
        } catch {
            proxyTarget = undefined;
        }
    }

    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: proxyTarget
            ? {
                  proxy: {
                      "/api": {
                          target: proxyTarget,
                          changeOrigin: true,
                          secure: false,
                      },
                  },
              }
            : undefined,
    };
});
