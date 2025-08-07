<template>
	<header class="header">
		<h1 class="header__title"><slot /></h1>
	</header>
</template>

<style scoped>
.header {
	background-color: #293039;
	color: white;
	padding: 1rem 0;
	text-align: center;
}

.header__title {
	font-size: 1.75rem;
	font-weight: bold;
	margin: 0;
}
</style>
