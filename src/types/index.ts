import type { ComputedRef, Ref } from 'vue';

/**
 * Represents a betting choice within an event
 */
export interface BetChoice {
	id: string;
	actor: {
		label: string;
	};
	odd: number;
}

/**
 * Represents a betting question
 */
export interface BetQuestion {
	label: string;
}

/**
 * Represents betting data for an event
 */
export interface BetData {
	question: BetQuestion;
	choices: BetChoice[];
}

/**
 * Represents a sports event with betting options
 */
export interface Event {
	id: string;
	label: string;
	sport: {
		label: string;
		icon: string;
	};
	category: {
		label: string;
	};
	competition: {
		label: string;
	};
	start: string; // ISO date string
	bet: Record<string, BetData>;
}

/**
 * Represents a bet that the user has selected
 */
export interface SelectedBet {
	key: string; // Unique identifier: "eventId-choiceId"
	eventLabel: string; // Display name of the event
	choiceLabel: string; // Display name of the choice
	odd: number; // Betting odd
	question: string; // The betting question
	eventId: string; // Reference to the event
	choiceId: string; // Reference to the choice
}

/**
 * Represents the data structure when bets are submitted
 */
export interface SubmissionData {
	bets: SelectedBet[];
	amount: number;
	total: string;
	potentialGain: string;
	timestamp: string;
}

/**
 * Return type interface for useEventHelpers composable
 */
export interface UseEventHelpersReturn {
	formatDate: (dateString: string) => string;
	hasEventLabel: (event: Event) => boolean;
	getBetChoices: (event: Event) => BetChoice[];
	getBetQuestion: (event: Event) => string;
	getEventBreadcrumb: (event: Event) => string;
}

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
 * Return type interface for useSuccessMessage composable
 */
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
