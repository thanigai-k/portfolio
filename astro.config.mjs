// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import react from "@astrojs/react";
import { SITE_BASE_PATH, SITE_BASE_URL } from "./src/consts";

// https://astro.build/config
export default defineConfig({
  site: SITE_BASE_URL,
  base: SITE_BASE_PATH,
  integrations: [mdx(), sitemap(), react(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
