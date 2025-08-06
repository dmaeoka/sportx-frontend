import vi from '@nuxt/ui/runtime/locale/vi.js';

global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn()
}
