import { defineConfig } from 'vitest/config'

const config = defineConfig({
  test: {
    globals: true,
    testTimeout: 10000
  }
})

export default config