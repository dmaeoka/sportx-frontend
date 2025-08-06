// Test setup file for Vitest
import { vi } from 'vitest';

// Global test configuration
global.console = {
	...console,
	// Suppress console warnings in tests if needed
	warn: vi.fn(),
	error: vi.fn(),
};
