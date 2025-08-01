<!-- Fixed components/EventsList.vue -->
<template>
	<div class="events-list">
		<EventCard
			v-for="event in events"
			:key="event.id"
			:event="event"
			:selected-bets="selectedBets"
			@toggle-bet="handleToggleBet"
		/>
	</div>
</template>

<script setup>
import EventCard from './EventCard.vue';

// Define props
defineProps({
	events: {
		type: Array,
		required: true,
	},
	selectedBets: {
		type: Array,
		required: true,
	},
});

// Define events this component can emit
const emit = defineEmits(['toggle-bet']);

// Handle the toggle bet event and pass it up
const handleToggleBet = (event, choice) => {
	emit('toggle-bet', event, choice);
};
</script>

<style scoped>
.events-list {
	flex: 1;
	background-color: #f1f5fb;
}

@media (max-width: 767px) {
	.events-list {
		border-right: none;
		border-bottom: 2px solid #1f2937;
	}
}
</style>
