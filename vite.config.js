import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    base: "/Grotesque/",
    plugins: [
        viteStaticCopy({
            targets: [
                { src: "src/main-page/*.partial.html", dest: "src/main-page" },
                { src: "src/footer/*.partial.html", dest: "src/footer" },
                { src: "src/menu/*.partial.html", dest: "src/menu" },
            ],
        }),
    ],
});
