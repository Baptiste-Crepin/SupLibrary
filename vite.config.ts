import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, type UserConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SupLibrary',
  resolve: {
    alias: {
      '@layouts': resolve(__dirname, './src/layouts'),
      '@services': resolve(__dirname, './src/services'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@pages': resolve(__dirname, './src/pages'),
      'utils': resolve(__dirname, './src/utils.ts'),
      'appConstants': resolve(__dirname, './src/appConstants.ts'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test.setup.js'
  }
} as UserConfig)
