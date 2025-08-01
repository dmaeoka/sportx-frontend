<!-- components/BetCard.vue -->
<template>
	<div class="bet-card">
		<div class="bet-card__header">
			<div class="bet-card__event">{{ bet.eventLabel }}</div>
			<button
				@click="$emit('remove')"
				class="bet-card__remove"
				title="Remove bet"
				aria-label="Remove bet"
			>
				<Icon
					name="material-symbols:close-rounded"
					class="bet-card__remove-icon"
				/>
			</button>
		</div>

		<div class="bet-card__question">{{ bet.question }}</div>

		<div class="bet-card__choice">
			<span class="bet-card__choice-label">{{ bet.choiceLabel }}</span>
			<span class="bet-card__odd">{{ bet.odd }}</span>
		</div>
	</div>
</template>

<script setup>
// Define props
defineProps({
	bet: {
		type: Object,
		required: true,
		validator: (bet) => {
			return (
				bet.key &&
				bet.eventLabel &&
				bet.choiceLabel &&
				bet.odd &&
				bet.question
			);
		},
	},
});

// Define events
defineEmits(['remove']);
</script>

<style scoped>
.bet-card {
	border: 1px solid #d1d5db;
	padding: .75rem;
	border-radius: .375rem;
	background-color: white;
	transition: all 0.2s ease;
}

.bet-card:hover {
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bet-card__header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: .5rem;
}

.bet-card__event {
	font-size: .875rem;
	font-weight: 500;
	color: #1f2937;
}

.bet-card__remove {
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
	transition: transform 0.2s ease;
}

.bet-card__remove:hover {
	transform: scale(1.1);
}

.bet-card__remove-icon {
	width: 1.5rem;
	height: 1.5rem;
	color: #ef4444;
	transition: color 0.2s ease;
}

.bet-card__remove:hover .bet-card__remove-icon {
	color: #dc2626;
}

.bet-card__question {
	font-size: .75rem;
	color: #6b7280;
	margin-bottom: .25rem;
}

.bet-card__choice {
	font-size: .875rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.bet-card__choice-label {
	color: #374151;
}

.bet-card__odd {
	font-weight: 600;
	color: #059669;
	background-color: #ecfdf5;
	padding: .125rem 0.375rem;
	border-radius: .25rem;
	font-size: .875rem;
}
</style>
