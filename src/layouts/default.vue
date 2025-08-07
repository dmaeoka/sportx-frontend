<template>
	<UApp>
		<div class="app">
			<!-- HEADER -->
			<AppHeader> SportX Senior Lead Frontend </AppHeader>
			<slot />
			<AppFooter> GiG SportX {{ year }} </AppFooter>
		</div>
	</UApp>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.app {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	font-family:
		system-ui,
		-apple-system,
		sans-serif;
	background-color: #ffffff;
}
</style>
