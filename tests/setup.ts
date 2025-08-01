import { vi } from 'vitest';

// Mock global objects that might not be available in test environment
global.console = {
	...console,
	// Uncomment to ignore logs during tests
	// log: vi.fn(),
	// warn: vi.fn(),
	// error: vi.fn(),
};

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// Mock fetch if not available
if (!global.fetch) {
	global.fetch = vi.fn();
}

// Setup for @nuxt/ui components if needed
// You can add more global mocks here as needed

// Example: Mock specific modules
vi.mock('@nuxt/ui', () => ({
	// Mock UI components if needed
}));

// Set test environment variables
process.env.NODE_ENV = 'test';
