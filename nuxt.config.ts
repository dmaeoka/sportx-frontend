// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/icon', '@pinia/nuxt'],
	srcDir: './src',
	css: ['~/assets/css/main.css'],
	vite: {
		esbuild: {
			target: 'esnext',
		},
	},
	build: {
		transpile: ['vue-toastification'],
	},

	imports: {
		dirs: ['composables/**', 'utils/**'],
	},
	app: {
		head: {
			title: 'SportX Betting Application',
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					name: 'description',
					content:
						'SportX Senior Frontend Tech Test - Betting Application',
				},
			],
		},
	},
});
