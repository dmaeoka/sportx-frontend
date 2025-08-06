<template>
	<div v-if="hasEventLabel(event)" class="event-card">
		<EventHeader :event="event" />
		<EventBetting
			:event="event"
			:selected-bets="selectedBets"
			@toggle-bet="handleToggleBet"
		/>
	</div>
</template>

<script setup>
// Define props that this component can receive
defineProps({
	event: {
		type: Object,
		required: true,
	},
	selectedBets: {
		type: Array,
		required: true,
	},
});

// Define events that this component can emit
const emit = defineEmits(['toggle-bet']);

// Use helpers
const { hasEventLabel } = useEventHelpers();

const handleToggleBet = (event, choice) => {
	// Handle the toggle bet event and pass it up
	emit('toggle-bet', event, choice);
};
</script>

<style scoped>
.event-card {
	padding: 1rem;
	background: #fff;
	border-radius: 8px;
	margin: 1rem;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.event-card__no-betting {
	padding: 1rem;
	color: #67798e;
	font-style: italic;
}
</style>
