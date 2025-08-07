import { ref, computed, readonly } from 'vue';
import { defineStore } from 'pinia'
import type { BetChoice, Event, SelectedBet, SubmissionData } from '../types'
import { useEventHelpers } from '../composables/useEventHelpers'

export const useBettingStore = defineStore('betting', () => {
	// State
	const selectedBets = ref<SelectedBet[]>([])
	const betAmount = ref<number>(1.0)
	const submissionHistory = ref<SubmissionData[]>([])

	// Success message state
	const showSuccessMessage = ref<boolean>(false)
	const lastSubmission = ref<SubmissionData | null>(null)

	// Get helpers
	const { getBetQuestion } = useEventHelpers()

	// Getters (computed)
	const betCount = computed((): number => selectedBets.value.length)

	const hasBets = computed((): boolean => selectedBets.value.length > 0)

	const calculateTotal = computed((): string => {
		return selectedBets.value.length > 0
			? (betAmount.value * selectedBets.value.length).toFixed(2)
			: '0.00'
	})

	const calculatePotentialGain = computed((): string => {
		if (selectedBets.value.length === 0) return '0.00'
		const totalOdds = selectedBets.value.reduce((sum, bet) => sum + bet.odd, 0)
		return (betAmount.value * totalOdds).toFixed(2)
	})

	const totalSubmissions = computed((): number => submissionHistory.value.length)

	const totalAmountWagered = computed((): string => {
		const total = submissionHistory.value.reduce((sum, submission) =>
			sum + parseFloat(submission.total), 0
		)
		return total.toFixed(2)
	})

	// Actions
	const toggleBet = (event: Event, choice: BetChoice): void => {
		const betKey = `${event.id}-${choice.id}`
		const existingBetIndex = selectedBets.value.findIndex(
			(bet) => bet.key === betKey
		)

		if (existingBetIndex !== -1) {
			// Remove bet if already selected
			selectedBets.value.splice(existingBetIndex, 1)
		} else {
			// Add new bet
			const newBet: SelectedBet = {
				key: betKey,
				eventLabel: event.label,
				choiceLabel: choice.actor.label,
				odd: choice.odd,
				question: getBetQuestion(event),
				eventId: event.id,
				choiceId: choice.id,
			}
			selectedBets.value.push(newBet)
		}
	}

	const removeBet = (betKey: string): void => {
		const index = selectedBets.value.findIndex((bet) => bet.key === betKey)
		if (index !== -1) {
			selectedBets.value.splice(index, 1)
		}
	}

	const isSelected = (eventId: string, choiceId: string): boolean => {
		return selectedBets.value.some(
			(bet) => bet.key === `${eventId}-${choiceId}`
		)
	}

	const increaseBetAmount = (): void => {
		betAmount.value = Math.round((betAmount.value + 0.1) * 100) / 100
	}

	const decreaseBetAmount = (): void => {
		betAmount.value = Math.max(
			0.1,
			Math.round((betAmount.value - 0.1) * 100) / 100
		)
	}

	const updateBetAmount = (amount: number | string): void => {
		const value = typeof amount === 'string' ? parseFloat(amount) : amount

		if (!isNaN(value) && value >= 0.1) {
			betAmount.value = Math.round(value * 100) / 100
		}
	}

	const clearAllBets = (): void => {
		selectedBets.value = []
	}

	const resetBetAmount = (): void => {
		betAmount.value = 1.0
	}

	const submitBets = (): SubmissionData => {
		if (selectedBets.value.length === 0) {
			throw new Error('No bets selected')
		}

		// Create submission data
		const submissionData: SubmissionData = {
			bets: [...selectedBets.value], // Create a copy
			amount: betAmount.value,
			total: calculateTotal.value,
			potentialGain: calculatePotentialGain.value,
			timestamp: new Date().toISOString(),
		}

		// Add to history
		submissionHistory.value.push(submissionData)

		// Set last submission for success message
		lastSubmission.value = submissionData

		// Log for debugging
		console.log('Submitting bets:', submissionData)

		// Clear the betting slip
		clearAllBets()
		resetBetAmount()

		// Show success message
		showSuccessMessage.value = true

		// Auto-hide success message after 5 seconds
		setTimeout(() => {
			showSuccessMessage.value = false
		}, 5000)

		return submissionData
	}

	const closeSuccessMessage = (): void => {
		showSuccessMessage.value = false
	}

	// Advanced actions
	const setBetAmount = (amount: number): void => {
		if (amount >= 0.1) {
			betAmount.value = Math.round(amount * 100) / 100
		}
	}

	const addMultipleBets = (eventChoicePairs: Array<{ event: Event, choice: BetChoice }>): void => {
		eventChoicePairs.forEach(({ event, choice }) => {
			const betKey = `${event.id}-${choice.id}`
			const isAlreadySelected = selectedBets.value.some(bet => bet.key === betKey)

			if (!isAlreadySelected) {
				toggleBet(event, choice)
			}
		})
	}

	const getSubmissionById = (timestamp: string): SubmissionData | undefined => {
		return submissionHistory.value.find(sub => sub.timestamp === timestamp)
	}

	const clearSubmissionHistory = (): void => {
		submissionHistory.value = []
	}

	// Return the store interface
	return {
		// State
		selectedBets: readonly(selectedBets),
		betAmount: readonly(betAmount),
		submissionHistory: readonly(submissionHistory),
		showSuccessMessage: readonly(showSuccessMessage),
		lastSubmission: readonly(lastSubmission),

		// Getters
		betCount,
		hasBets,
		calculateTotal,
		calculatePotentialGain,
		totalSubmissions,
		totalAmountWagered,

		// Actions
		toggleBet,
		removeBet,
		isSelected,
		increaseBetAmount,
		decreaseBetAmount,
		updateBetAmount,
		clearAllBets,
		resetBetAmount,
		submitBets,
		closeSuccessMessage,
		setBetAmount,
		addMultipleBets,
		getSubmissionById,
		clearSubmissionHistory,
	}
})
