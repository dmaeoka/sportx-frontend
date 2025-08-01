import { computed, type ComputedRef, type Ref } from 'vue';
import type {
	BetChoice,
	Event,
	SelectedBet,
	SubmissionData,
} from '../types';
import { useEventHelpers } from './useEventHelpers';

/**
 * Return type interface for useBettingLogic composable
 */
export interface UseBettingLogicReturn {
	toggleBet: (event: Event, choice: BetChoice) => void;
	removeBet: (betKey: string) => void;
	increaseBetAmount: () => void;
	decreaseBetAmount: () => void;
	updateBetAmount: (amount: number | string) => void;
	submitBets: () => SubmissionData;
	clearAllBets: () => void;
	isSelected: (eventId: string, choiceId: string) => boolean;
	calculateTotal: ComputedRef<string>;
	calculatePotentialGain: ComputedRef<string>;
	betCount: ComputedRef<number>;
	hasBets: ComputedRef<boolean>;
}

/**
 * Composable for managing betting logic and state
 * @param selectedBets - Reactive array of selected bets
 * @param betAmount - Reactive bet amount value
 * @returns Object containing betting actions and computed properties
 */
export function useBettingLogic(
	selectedBets: Ref<SelectedBet[]>,
	betAmount: Ref<number>
): UseBettingLogicReturn {
	const { getBetQuestion } = useEventHelpers();

	/**
	 * Toggles a bet selection - adds if not selected, removes if already selected
	 * @param event - The event object
	 * @param choice - The betting choice object
	 */
	const toggleBet = (event: Event, choice: BetChoice): void => {
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
			// Add new bet with proper typing
			const newBet: SelectedBet = {
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
	 * @param betKey - The unique bet key to remove
	 */
	const removeBet = (betKey: string): void => {
		selectedBets.value = selectedBets.value.filter(
			(bet) => bet.key !== betKey
		);
	};

	/**
	 * Checks if a specific bet is currently selected
	 * @param eventId - The event ID
	 * @param choiceId - The choice ID
	 * @returns True if the bet is selected
	 */
	const isSelected = (eventId: string, choiceId: string): boolean => {
		return selectedBets.value.some(
			(bet) => bet.key === `${eventId}-${choiceId}`
		);
	};

	/**
	 * Increases the bet amount by 0.1 with proper rounding
	 */
	const increaseBetAmount = (): void => {
		betAmount.value = Math.round((betAmount.value + 0.1) * 100) / 100;
	};

	/**
	 * Decreases the bet amount by 0.1 (minimum 0.1) with proper rounding
	 */
	const decreaseBetAmount = (): void => {
		betAmount.value = Math.max(
			0.1,
			Math.round((betAmount.value - 0.1) * 100) / 100
		);
	};

	/**
	 * Updates the bet amount with validation
	 * @param amount - The new amount (number or string)
	 */
	const updateBetAmount = (amount: number | string): void => {
		const value = typeof amount === 'string' ? parseFloat(amount) : amount;

		if (!isNaN(value) && value >= 0.1) {
			betAmount.value = Math.round(value * 100) / 100;
		}
	};

	/**
	 * Calculates the total bet amount (amount × number of bets)
	 * Returns a computed property for reactivity
	 */
	const calculateTotal = computed((): string => {
		return selectedBets.value.length > 0 ? (betAmount.value * selectedBets.value.length).toFixed(2) : '0.00';
	});

	/**
	 * Calculates the potential gain based on odds
	 * Returns a computed property for reactivity
	 */
	const calculatePotentialGain = computed((): string => {
		if (selectedBets.value.length === 0) return '0.00';
		const totalOdds = selectedBets.value.reduce(
			(sum, bet) => sum + bet.odd,
			0
		);
		return (betAmount.value * totalOdds).toFixed(2);
	});

	/**
	 * Gets the number of selected bets
	 */
	const betCount = computed((): number => selectedBets.value.length);

	/**
	 * Checks if any bets are selected
	 */
	const hasBets = computed((): boolean => selectedBets.value.length > 0);

	/**
	 * Submits the current bets and returns the submission data
	 * @returns Submission data object
	 * @throws Error when no bets are selected
	 */
	const submitBets = (): SubmissionData => {
		if (selectedBets.value.length === 0) {
			throw new Error('No bets selected');
		}

		// Create submission data with proper typing
		const submissionData: SubmissionData = {
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

	// Clears all selected bets
	const clearAllBets = (): void => {
		selectedBets.value = [];
	};

	// Return all the betting functions and computed properties with proper typing
	return {
		toggleBet,
		removeBet,
		increaseBetAmount,
		decreaseBetAmount,
		updateBetAmount,
		submitBets,
		clearAllBets,
		isSelected,
		calculateTotal,
		calculatePotentialGain,
		betCount,
		hasBets,
	};
}
