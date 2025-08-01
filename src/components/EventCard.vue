<template>
	<div class="event-card">
		<EventHeader :event="event" />
		<EventBetting
			v-if="hasEventLabel(event)"
			:event="event"
			:selected-bets="selectedBets"
			@toggle-bet="handleToggleBet"
		/>
	</div>
</template>

<script setup>
import { useEventHelpers } from '../composables/useEventHelpers.js';
import EventBetting from './EventBetting.vue';
import EventHeader from './EventHeader.vue';

// Define props
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

// Define events
const emit = defineEmits(['toggle-bet']);

// Use helpers
const { hasEventLabel } = useEventHelpers();

// Handle the toggle bet event and pass it up
const handleToggleBet = (event, choice) => {
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
