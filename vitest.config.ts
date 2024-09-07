import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ['./setupTests.ts'],
      environment: 'jsdom',
      globals: true,
      exclude: [...configDefaults.exclude, 'e2e/**'],
      include: ['src/**/*.test.ts', 'src/**/*.spec.ts', 'tests/**/*.ts'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
