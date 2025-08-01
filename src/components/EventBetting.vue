<!-- Fixed components/EventBetting.vue -->
<template>
	<div class="event-betting">
		<div class="event-betting__choices">
			<BetChoice
				v-for="choice in getBetChoices(event)"
				:key="choice.id"
				:choice="choice"
				:is-selected="isSelectedChoice(choice.id)"
				@click="handleChoiceClick(choice)"
			/>
		</div>
	</div>
</template>

<script setup>
import { useEventHelpers } from '../composables/useEventHelpers.js';
import BetChoice from './BetChoice.vue';

// Define props
const props = defineProps({
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
const { getBetChoices } = useEventHelpers();

// Check if a choice is selected (simpler approach)
const isSelectedChoice = (choiceId) => {
	return props.selectedBets.some(
		(bet) => bet.key === `${props.event.id}-${choiceId}`
	);
};

// Handle choice click and emit the toggle-bet event
const handleChoiceClick = (choice) => {
	emit('toggle-bet', props.event, choice);
};
</script>

<style scoped>
.event-betting {
	padding: 1rem 0;
}

.event-betting__choices {
	display: flex;
	gap: .5rem;
	flex-wrap: wrap;
}
</style>
