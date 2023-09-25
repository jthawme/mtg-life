import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { defineConfig } from "vite";
import svg from '@poppanator/sveltekit-svg'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [sveltekit(), SvelteKitPWA(), svg(), Icons({
    compiler: 'svelte',
  })],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },
});
