<template>
	<div class="min-h-screen">
		<!-- Header -->
		<AppHeader />
		<SuccessAlert
			v-if="showSuccessMessage"
			:bets="submittedBets"
			:total="submittedTotal"
			:potential="submittedPotentialGain"
			@close="showSuccessMessage = false"
		/>

		<main class="flex flex-col md:flex-row">
			<!-- Main Content -->
			<div class="flex-1 border-r-2 border-gray-800">
				<div
					v-for="event in sportsData.events"
					:key="event.id"
					class="border-b border-gray-300"
				>
					<!-- Event Header -->
					<div class="p-4 bg-gray-50 border-b border-gray-300">
						<div class="text-sm text-gray-600 mb-2">
							{{ event.sport.label }} /
							{{ event.category.label }} /
							{{ event.competition.label }}
						</div>
						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<span
									class="mr-2 text-sm bg-gray-200 px-2 py-1 rounded"
								>
									[{{ event.sport.icon }}]
								</span>
								<span class="font-medium">
									{{
										hasEventLabel(event)
											? event.label
											: 'Other Event'
									}}
								</span>
							</div>
							<div class="text-sm text-gray-600">
								{{ formatDate(event.start) }}
							</div>
						</div>
					</div>

					<!-- Betting Options -->
					<div v-if="hasEventLabel(event)" class="p-4">
						<div class="flex gap-2 mb-2">
							<button
								v-for="choice in getBetChoices(event)"
								:key="choice.id"
								@click="toggleBet(event, choice)"
								:class="[
									'px-4 py-2 border-2 rounded transition-colors cursor-pointer',
									isSelected(event.id, choice.id)
										? 'border-green-500 bg-green-100 font-bold'
										: 'border-gray-300 hover:border-gray-400',
								]"
							>
								<div class="text-center">
									<div class="text-sm">
										{{ choice.actor.label }}
									</div>
									<div class="font-bold">
										{{ choice.odd }}
									</div>
								</div>
							</button>
						</div>
					</div>

					<div v-else class="p-4 text-gray-500 italic">
						Other Event
					</div>
				</div>
			</div>

			<!-- My Choices Sidebar -->
			<div class="w-full md:w-80 bg-gray-50">
				<div class="p-4 border-b border-gray-300">
					<h3 class="font-bold text-lg mb-4">My Choices</h3>

					<div
						v-if="selectedBets.length === 0"
						class="text-gray-500 italic"
					>
						No bets chosen
					</div>

					<div v-else class="space-y-3">
						<div
							v-for="bet in selectedBets"
							:key="bet.key"
							class="border border-gray-300 p-3 rounded"
						>
							<div class="flex justify-between items-start mb-2">
								<div class="text-sm font-medium">
									{{ bet.eventLabel }}
								</div>
								<button
									@click="removeBet(bet.key)"
									title="Remove bet"
									class="cursor-pointer"
								>
									<Icon
										name="material-symbols:close-rounded"
										class="w-6 h-6 text-red-500 hover:text-red-700"
									/>
								</button>
							</div>
							<div class="text-xs text-gray-600 mb-1">
								{{ bet.question }}
							</div>
							<div class="text-sm">
								- {{ bet.choiceLabel }}
								<span class="float-right">{{ bet.odd }}</span>
							</div>
						</div>
					</div>

					<div class="mt-6 border-t border-gray-300 pt-4">
						<!-- Amount Controls -->
						<div class="mb-4">
							<label class="block text-sm font-medium mb-2"
								>Amount</label
							>
							<div class="flex items-stretch gap-2">
								<button
									@click="decreaseBetAmount"
									class="border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center cursor-pointer"
								>
									<Icon
										name="material-symbols:remove"
										class="w-6 h-6"
									/>
								</button>
								<input
									v-model.number="betAmount"
									@input="handleAmountInput"
									type="number"
									step="0.1"
									min="0.1"
									class="flex-1 px-2 py-1 border border-gray-300 rounded text-center text-sm"
								/>
								<button
									@click="increaseBetAmount"
									class="border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center cursor-pointer"
								>
									<Icon
										name="material-symbols:add"
										class="w-6 h-6"
									/>
								</button>
							</div>
						</div>

						<!-- Totals -->
						<div class="space-y-2 mb-4">
							<div class="flex justify-between">
								<span>Total</span>
								<span>{{ calculateTotal() }}€</span>
							</div>
							<div class="flex justify-between">
								<span>Potential Gain</span>
								<span>{{ calculatePotentialGain() }}€</span>
							</div>
						</div>

						<!-- Submit Button -->
						<button
							@click="handleSubmit"
							:disabled="selectedBets.length === 0"
							:class="[
								'w-full py-2 px-4 rounded border-2',
								selectedBets.length > 0
									? 'border-gray-800 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer'
									: 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none',
							]"
						>
							Submit bets
						</button>
					</div>
				</div>
			</div>
		</main>

		<!-- Footer -->
		<footer class="bg-gray-100 p-2 text-right text-sm text-gray-600">
			GiG SportX 2025
		</footer>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import AppHeader from '~/components/AppHeader.vue';
import sportsData from './data/products.json';

// Reactive data
const selectedBets = ref([]);
const betAmount = ref(1.0);
const showSuccessMessage = ref(false);
const submittedBets = ref([]);
const submittedTotal = ref('');
const submittedPotentialGain = ref('');

// Helper functions
const formatDate = (dateString) => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleDateString('en-UK', { month: 'long' });
	const time = date.toLocaleTimeString('en-UK', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});
	return `${day}th of ${month} ${time}`;
};

const hasEventLabel = (event) => {
	return event.label && event.label.trim() !== '';
};

const getBetChoices = (event) => {
	const betData = Object.values(event.bet)[0];
	return betData.choices;
};

const toggleBet = (event, choice) => {
	const betKey = `${event.id}-${choice.id}`;
	const existingBetIndex = selectedBets.value.findIndex(
		(bet) => bet.key === betKey
	);

	if (existingBetIndex !== -1) {
		// Remove bet
		selectedBets.value = selectedBets.value.filter(
			(bet) => bet.key !== betKey
		);
	} else {
		// Add bet
		const betData = Object.values(event.bet)[0];
		const newBet = {
			key: betKey,
			eventLabel: event.label,
			choiceLabel: choice.actor.label,
			odd: choice.odd,
			question: betData.question.label,
			eventId: event.id,
			choiceId: choice.id,
		};
		selectedBets.value.push(newBet);
	}
};

const removeBet = (betKey) => {
	selectedBets.value = selectedBets.value.filter((bet) => bet.key !== betKey);
};

const isSelected = (eventId, choiceId) => {
	return selectedBets.value.some(
		(bet) => bet.key === `${eventId}-${choiceId}`
	);
};

const increaseBetAmount = () => {
	betAmount.value = Math.round((betAmount.value + 0.1) * 100) / 100;
};

const decreaseBetAmount = () => {
	betAmount.value = Math.max(
		0.1,
		Math.round((betAmount.value - 0.1) * 100) / 100
	);
};

const handleAmountInput = (e) => {
	const value = parseFloat(e.target.value);
	if (!isNaN(value) && value >= 0.1) {
		betAmount.value = Math.round(value * 100) / 100;
	}
};

const calculateTotal = () => {
	return selectedBets.value.length > 0
		? (betAmount.value * selectedBets.value.length).toFixed(2)
		: '0.00';
};

const calculatePotentialGain = () => {
	if (selectedBets.value.length === 0) return '0.00';
	const totalOdds = selectedBets.value.reduce((sum, bet) => sum + bet.odd, 0);
	return (betAmount.value * totalOdds).toFixed(2);
};

const handleSubmit = () => {
	if (selectedBets.value.length === 0) return;

	// Store the submitted data
	submittedBets.value = [...selectedBets.value];
	submittedTotal.value = calculateTotal();
	submittedPotentialGain.value = calculatePotentialGain();

	// Log the submission for debugging/backend integration
	console.log('Submitting bets:', {
		bets: selectedBets.value,
		amount: betAmount.value,
		total: submittedTotal.value,
		potentialGain: submittedPotentialGain.value,
		timestamp: new Date().toISOString(),
	});

	// Show success message
	showSuccessMessage.value = true;

	// Clear the betting slip
	selectedBets.value = [];
	betAmount.value = 1.0;

	// Auto-hide success message after 5 seconds
	setTimeout(() => {
		showSuccessMessage.value = false;
	}, 5000);
};

const closeSuccessMessage = () => {
	showSuccessMessage.value = false;
};
</script>

<style scoped>
/* Additional styles if needed */
.transition-colors {
	transition:
		background-color 0.2s ease,
		border-color 0.2s ease;
}
</style>
