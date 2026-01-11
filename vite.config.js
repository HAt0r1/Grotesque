import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    base: "/Grotesque/",
    plugins: [
        viteStaticCopy({
            targets: [
                { src: "src/html-partials/**/*", dest: "src/html-partials" },
            ],
        }),
    ],
});
