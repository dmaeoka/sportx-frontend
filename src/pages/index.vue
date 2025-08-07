<template>
	<div>
		<SuccessNotification
			v-if="showSuccessMessage"
			:submitted-bets="submittedBets"
			:submitted-total="submittedTotal"
			:submitted-potential-gain="submittedPotentialGain"
			@close="closeSuccessMessage"
		/>
		<main class="app__main">
			<!-- EVENTS LIST -->
			<EventsList
				:events="sportsData.events"
				:selected-bets="selectedBets"
				@toggle-bet="handleToggleBet"
			/>
			<!-- BETTING SLIP -->
			<BettingSlip
				:selected-bets="selectedBets"
				:bet-amount="betAmount"
				:calculate-total="calculateTotal"
				:calculate-potential-gain="calculatePotentialGain"
				:bet-count="betCount"
				:has-bets="hasBets"
				@remove-bet="handleRemoveBet"
				@update-amount="handleUpdateAmount"
				@increase-amount="handleIncreaseAmount"
				@decrease-amount="handleDecreaseAmount"
				@submit="handleSubmit"
			/>
		</main>
	</div>
</template>

<script setup>
import { ref } from 'vue';
// Import mock data
import sportsData from '@/data/products.json';

// State
const selectedBets = ref([]); // initial empty array
const betAmount = ref(1); // initial amount of 1 eruo

const {
	showSuccessMessage,
	submittedBets,
	submittedTotal,
	submittedPotentialGain,
	showSuccess,
	closeSuccessMessage,
} = useSuccessMessage();

const {
	toggleBet,
	removeBet,
	increaseBetAmount,
	decreaseBetAmount,
	updateBetAmount,
	submitBets,
	calculateTotal,
	calculatePotentialGain,
	betCount,
	hasBets,
} = useBettingLogic(selectedBets, betAmount);

// Event handlers
const handleToggleBet = (event, choice) => {
	console.log('Toggle bet:', event.label, choice.actor.label);
	toggleBet(event, choice);
};

const handleRemoveBet = (betKey) => {
	console.log('Remove bet:', betKey);
	removeBet(betKey);
};

const handleUpdateAmount = (amount) => {
	console.log('Update amount:', amount);
	updateBetAmount(amount);
};

const handleIncreaseAmount = () => {
	increaseBetAmount();
};

const handleDecreaseAmount = () => {
	decreaseBetAmount();
};

const handleSubmit = () => {
	try {
		const submissionData = submitBets();
		console.log('Submitted bets:', submissionData);
		showSuccess(
			submissionData.bets,
			submissionData.total,
			submissionData.potentialGain
		);
	} catch (error) {
		console.error('Error submitting bets:', error.message);
	}
};
</script>

<style scoped>
.app__main {
	display: flex;
	flex: 1;
	flex-direction: column;
}

@media (min-width: 768px) {
	.app__main {
		flex-direction: row;
	}
}
</style>
