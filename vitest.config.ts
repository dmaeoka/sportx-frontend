import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
	// Nuxt test utils configuration
	test: {
		environment: 'nuxt',
		// Alternative: 'happy-dom' or 'jsdom'
		// environment: 'happy-dom',

		// Test files patterns
		include: [
			'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
			'**/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
			'**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
		],

		// Exclude patterns
		exclude: ['node_modules', 'dist', '.nuxt', '.output', 'coverage'],

		// Global test setup
		globals: true,

		// Coverage configuration
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'lcov'],
			include: [
				'composables/**/*.{js,ts}',
				'components/**/*.{vue,js,ts}',
				'pages/**/*.{vue,js,ts}',
				'layouts/**/*.{vue,js,ts}',
				'plugins/**/*.{js,ts}',
				'middleware/**/*.{js,ts}',
				'utils/**/*.{js,ts}',
				'stores/**/*.{js,ts}',
			],
			exclude: [
				'node_modules',
				'dist',
				'.nuxt',
				'.output',
				'coverage',
				'**/*.d.ts',
				'**/*.config.{js,ts}',
				'tests/**',
			],
			// Coverage thresholds
			thresholds: {
				global: {
					branches: 80,
					functions: 80,
					lines: 80,
					statements: 80,
				},
			},
		},

		// Test timeout
		testTimeout: 10000,

		// Setup files (run before each test file)
		setupFiles: ['./tests/setup.ts'],

		// Mock configuration
		mockReset: true,
		clearMocks: true,
		restoreMocks: true,
	},
});
