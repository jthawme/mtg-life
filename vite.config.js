import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { defineConfig } from "vite";
import svg from '@poppanator/sveltekit-svg'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [sveltekit(), SvelteKitPWA({
    manifest: {
      name: "Life Counter",
      short_name: "Life",
      description: 'Minimal life counter for MTG games',
      theme_color: '#111',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
  }), svg(), Icons({
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
