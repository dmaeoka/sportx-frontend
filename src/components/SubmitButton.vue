<template>
	<button
		@click="$emit('submit')"
		:disabled="!hasBets"
		:class="buttonClasses"
	>
		<span v-if="hasBets">Submit bets ({{ betCount }})</span>
		<span v-else>Submit bets</span>
	</button>
</template>

<script setup>
import { computed } from 'vue';

// Define props
const props = defineProps({
	hasBets: {
		type: Boolean,
		required: true,
	},
	betCount: {
		type: Number,
		required: true,
	},
});

// Define events
defineEmits(['submit']);

// Computed button classes
const buttonClasses = computed(() => [
	'submit-button',
	props.hasBets ? 'submit-button--enabled' : 'submit-button--disabled',
]);
</script>

<style scoped>
.submit-button {
	width: 100%;
	padding: 0.75rem 1rem;
	border-radius: 0.375rem;
	border: 2px solid;
	font-weight: 600;
	font-size: 0.875rem;
	transition: all 0.2s ease;
	text-transform: uppercase;
	letter-spacing: 0.025em;
}

.submit-button--enabled {
	border-color: #382cdd;
	background-color: #382cdd;
	color: white;
	cursor: pointer;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.submit-button--enabled:hover {
	background-color: #2a20b8;
	border-color: #382cdd;
	transform: translateY(-1px);
}

.submit-button--enabled:active {
	transform: translateY(0);
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.submit-button--disabled {
	border-color: #d1d5db;
	background-color: #f3f4f6;
	color: #9ca3af;
	cursor: not-allowed;
}
</style>
