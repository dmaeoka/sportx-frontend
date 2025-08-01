// This is a composable - a reusable piece of Vue logic
import { ref } from 'vue';

export function useSuccessMessage() {
	// State for the success message
	const showSuccessMessage = ref(false);
	const submittedBets = ref([]);
	const submittedTotal = ref('');
	const submittedPotentialGain = ref('');

	// Function to show success message with data
	const showSuccess = (bets, total, potentialGain) => {
		submittedBets.value = [...bets]; // Create a copy
		submittedTotal.value = total;
		submittedPotentialGain.value = potentialGain;
		showSuccessMessage.value = true;

		// Auto-hide success message after 5 seconds
		setTimeout(() => {
			showSuccessMessage.value = false;
		}, 5000);
	};

	// Function to manually close the message
	const closeSuccessMessage = () => {
		showSuccessMessage.value = false;
	};

	// Return the reactive state and functions
	return {
		showSuccessMessage,
		submittedBets,
		submittedTotal,
		submittedPotentialGain,
		showSuccess,
		closeSuccessMessage,
	};
}
