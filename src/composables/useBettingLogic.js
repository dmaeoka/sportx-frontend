// This composable contains all the core betting business logic
import { computed } from 'vue';
import { useEventHelpers } from './useEventHelpers.js';

export function useBettingLogic(selectedBets, betAmount) {
	// Import helper functions
	const { getBetQuestion } = useEventHelpers();

	/**
	 * Toggles a bet selection - adds if not selected, removes if already selected
	 * @param {Object} event - The event object
	 * @param {Object} choice - The betting choice object
	 */
	const toggleBet = (event, choice) => {
		const betKey = `${event.id}-${choice.id}`;
		const existingBetIndex = selectedBets.value.findIndex(
			(bet) => bet.key === betKey
		);

		if (existingBetIndex !== -1) {
			// Remove bet if already selected
			selectedBets.value = selectedBets.value.filter(
				(bet) => bet.key !== betKey
			);
		} else {
			// Add new bet
			const newBet = {
				key: betKey,
				eventLabel: event.label,
				choiceLabel: choice.actor.label,
				odd: choice.odd,
				question: getBetQuestion(event),
				eventId: event.id,
				choiceId: choice.id,
			};
			selectedBets.value.push(newBet);
		}
	};

	/**
	 * Removes a specific bet by its key
	 * @param {string} betKey - The unique bet key to remove
	 */
	const removeBet = (betKey) => {
		selectedBets.value = selectedBets.value.filter(
			(bet) => bet.key !== betKey
		);
	};

	/**
	 * Checks if a specific bet is currently selected
	 * @param {string} eventId - The event ID
	 * @param {string} choiceId - The choice ID
	 * @returns {boolean} True if the bet is selected
	 */
	const isSelected = (eventId, choiceId) => {
		return selectedBets.value.some(
			(bet) => bet.key === `${eventId}-${choiceId}`
		);
	};

	/**
	 * Increases the bet amount by 0.1
	 */
	const increaseBetAmount = () => {
		betAmount.value = Math.round((betAmount.value + 0.1) * 100) / 100;
	};

	/**
	 * Decreases the bet amount by 0.1 (minimum 0.1)
	 */
	const decreaseBetAmount = () => {
		betAmount.value = Math.max(
			0.1,
			Math.round((betAmount.value - 0.1) * 100) / 100
		);
	};

	/**
	 * Updates the bet amount with validation
	 * @param {number|string} amount - The new amount
	 */
	const updateBetAmount = (amount) => {
		const value = parseFloat(amount);
		if (!isNaN(value) && value >= 0.1) {
			betAmount.value = Math.round(value * 100) / 100;
		}
	};

	/**
	 * Calculates the total bet amount (amount × number of bets)
	 * Returns a computed property for reactivity
	 */
	const calculateTotal = computed(() => {
		return selectedBets.value.length > 0
			? (betAmount.value * selectedBets.value.length).toFixed(2)
			: '0.00';
	});

	/**
	 * Calculates the potential gain based on odds
	 * Returns a computed property for reactivity
	 */
	const calculatePotentialGain = computed(() => {
		if (selectedBets.value.length === 0) return '0.00';
		const totalOdds = selectedBets.value.reduce(
			(sum, bet) => sum + bet.odd,
			0
		);
		return (betAmount.value * totalOdds).toFixed(2);
	});

	/**
	 * Submits the current bets and returns the submission data
	 * @returns {Object} Submission data object
	 */
	const submitBets = () => {
		if (selectedBets.value.length === 0) {
			throw new Error('No bets selected');
		}

		// Create submission data
		const submissionData = {
			bets: [...selectedBets.value], // Create a copy
			amount: betAmount.value,
			total: calculateTotal.value,
			potentialGain: calculatePotentialGain.value,
			timestamp: new Date().toISOString(),
		};

		// Log for debugging/backend integration
		console.log('Submitting bets:', submissionData);

		// Clear the betting slip
		selectedBets.value = [];
		betAmount.value = 1.0;

		return submissionData;
	};

	/**
	 * Clears all selected bets
	 */
	const clearAllBets = () => {
		selectedBets.value = [];
	};

	/**
	 * Gets the number of selected bets
	 */
	const betCount = computed(() => selectedBets.value.length);

	/**
	 * Checks if any bets are selected
	 */
	const hasBets = computed(() => selectedBets.value.length > 0);

	// Return all the betting functions and computed properties
	return {
		// Actions
		toggleBet,
		removeBet,
		increaseBetAmount,
		decreaseBetAmount,
		updateBetAmount,
		submitBets,
		clearAllBets,

		// Getters
		isSelected,
		calculateTotal,
		calculatePotentialGain,
		betCount,
		hasBets,
	};
}
