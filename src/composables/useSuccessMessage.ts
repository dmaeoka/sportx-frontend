import { ref, type Ref } from 'vue';
import type { SelectedBet } from '../types';

export interface UseSuccessMessageReturn {
	readonly showSuccessMessage: Ref<boolean>;
	readonly submittedBets: Ref<SelectedBet[]>;
	readonly submittedTotal: Ref<string>;
	readonly submittedPotentialGain: Ref<string>;

	// Actions
	showSuccess: (
		bets: SelectedBet[],
		total: string,
		potentialGain: string
	) => void;
	closeSuccessMessage: () => void;
}

export function useSuccessMessage(): UseSuccessMessageReturn {
	const showSuccessMessage: Ref<boolean> = ref(false);
	const submittedBets: Ref<SelectedBet[]> = ref([]);
	const submittedTotal: Ref<string> = ref('');
	const submittedPotentialGain: Ref<string> = ref('');
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	/**
	 * Shows success message with provided data
	 * @param bets - Array of submitted bets
	 * @param total - Total bet amount as string (e.g., "5.00")
	 * @param potentialGain - Potential gain as string (e.g., "10.00")
	 */
	const showSuccess = (
		bets: SelectedBet[],
		total: string,
		potentialGain: string
	): void => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		// Update state with new data
		submittedBets.value = [...bets]; // Create a copy to prevent mutations
		submittedTotal.value = total;
		submittedPotentialGain.value = potentialGain;
		showSuccessMessage.value = true;

		timeoutId = setTimeout(() => {
			showSuccessMessage.value = false;
			timeoutId = null;
		}, 5000);
	};

	// Manually closes the message and clear the timeout
	const closeSuccessMessage = (): void => {
		showSuccessMessage.value = false;

		// Clear timeout if it exists
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	};

	return {
		showSuccessMessage,
		submittedBets,
		submittedTotal,
		submittedPotentialGain,
		showSuccess,
		closeSuccessMessage,
	};
}
