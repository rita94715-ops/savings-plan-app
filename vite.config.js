import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Savings Plan App',
        short_name: 'Savings Plan',
        description: 'A PWA app for savings planning on iPhone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%234CAF50" width="192" height="192"/><text x="50%" y="50%" font-size="100" fill="white" text-anchor="middle" dy=".3em">💰</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="%234CAF50" width="512" height="512"/><text x="50%" y="50%" font-size="300" fill="white" text-anchor="middle" dy=".3em">💰</text></svg>',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
              }
            }
          }
        ]
      }
    })
  ]
})
