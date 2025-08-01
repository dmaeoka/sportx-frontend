<!-- Fixed components/BetChoice.vue -->
<template>
	<button @click="$emit('click')" :class="buttonClasses">
		<div class="bet-choice__content">
			<div class="bet-choice__label">{{ choice.actor.label }}</div>
			<div class="bet-choice__odd">{{ choice.odd }}</div>
		</div>
	</button>
</template>

<script setup>
import { computed } from 'vue';

// Define props
const props = defineProps({
	choice: {
		type: Object,
		required: true,
	},
	isSelected: {
		type: Boolean,
		default: false,
	},
});

// Define events
defineEmits(['click']);

// Computed classes for the button
const buttonClasses = computed(() => [
	'bet-choice',
	props.isSelected ? 'bet-choice--selected' : 'bet-choice--default',
]);
</script>

<style scoped>
.bet-choice {
	padding: 0.5rem 1rem;
	border: 2px solid;
	border-radius: 0.375rem;
	cursor: pointer;
	transition: all 0.2s ease;
	background-color: white;
	min-width: 80px;
}

.bet-choice--default {
	border-color: #d1d5db;
}

.bet-choice--default:hover {
	border-color: #9ca3af;
}

.bet-choice--selected {
	border-color: #382cdd;
	background-color: #382cdd21;
}

.bet-choice__content {
	text-align: center;
}

.bet-choice__label {
	font-size: 0.875rem;
	margin-bottom: 0.25rem;
}

.bet-choice__odd {
	font-weight: bold;
}
</style>
