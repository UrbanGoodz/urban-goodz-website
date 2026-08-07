import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: 'src',
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    viteReact(),
    nitro({
      // Ship .gz/.br alongside static assets so a proxy can serve them directly.
      compressPublicAssets: { gzip: true, brotli: true },
      routeRules: {
        '/**': {
          headers: {
            // 'unsafe-inline' for scripts is required by the framework's inline
            // hydration payload and the JSON-LD blocks. Tighten to a nonce if
            // TanStack Start gains nonce support.
            //
            // connect-src includes Firebase Cloud Messaging's registration and
            // installation endpoints for the web push opt-in (src/lib/push.ts),
            // and the admin panel's public waitlist endpoint that the signup
            // form posts leads to (src/lib/waitlist.ts). If a webhook host is
            // later wired in for VITE_PUSH_SUBSCRIBE_WEBHOOK_URL, that host must
            // be added here too or the browser will block it.
            'Content-Security-Policy': [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob:",
              "connect-src 'self' https://fcmregistrations.googleapis.com https://firebaseinstallations.googleapis.com https://admin.urbangoodzdelivery.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
            'Cross-Origin-Opener-Policy': 'same-origin',
            // Only honoured over HTTPS; harmless on the local HTTP server.
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          },
        },
        // The messaging service worker needs to importScripts() from gstatic —
        // the default page CSP above would otherwise block that load.
        '/firebase-messaging-sw.js': {
          headers: {
            'Content-Security-Policy': [
              "default-src 'self'",
              "script-src 'self' https://www.gstatic.com",
              "connect-src 'self' https://fcmregistrations.googleapis.com https://firebaseinstallations.googleapis.com",
              "object-src 'none'",
            ].join('; '),
          },
        },
      },
    }),
  ],
})
