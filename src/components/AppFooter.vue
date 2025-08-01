<!-- components/AppFooter.vue -->
<template>
	<footer class="footer">
		<p class="footer__text">GiG SportX {{ year }}</p>
	</footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
	background-color: #293039;
	padding: 1rem;
	text-align: right;
}

.footer__text {
	font-size: 1rem;
	color: #fff;
	margin: 0;
}
</style>
