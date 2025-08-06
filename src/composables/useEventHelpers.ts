import type { BetChoice, Event, UseEventHelpersReturn } from '../types';

/**
 * Composable containing all event-related utility functions
 * @returns Object with event helper functions
 */
export function useEventHelpers(): UseEventHelpersReturn {
	/**
	 * Formats a date string into a readable format
	 * @param dateString - ISO date string
	 * @returns Formatted date like "15th of January 14:30"
	 */
	const formatDate = (dateString: string): string => {
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

	/**
	 * Checks if an event has a valid label
	 * @param event - Event object
	 * @returns True if event has a non-empty label
	 */
	const hasEventLabel = (event: Event): boolean => {
		// FIXED: Return proper boolean instead of truthy/falsy value
		return Boolean(event.label && event.label.trim() !== '');
	};

	/**
	 * Gets betting choices from an event
	 * @param event - Event object with bet data
	 * @returns Array of betting choices
	 */
	const getBetChoices = (event: Event): BetChoice[] => {
		const betData = Object.values(event.bet)[0];
		if (!betData || !betData.choices) {
			throw new Error('Event has no valid bet data');
		}
		return betData.choices;
	};

	/**
	 * Gets the betting question from an event
	 * @param event - Event object with bet data
	 * @returns The betting question label
	 */
	const getBetQuestion = (event: Event): string => {
		const betData = Object.values(event.bet)[0];
		if (!betData || !betData.question) {
			throw new Error('Event has no valid bet question');
		}
		return betData.question.label;
	};

	/**
	 * Creates a breadcrumb string for an event
	 * @param event - Event object
	 * @returns Breadcrumb like "Football / Premier League / Match"
	 */
	const getEventBreadcrumb = (event: Event): string => {
		return `${event.sport.label} / ${event.category.label} / ${event.competition.label}`;
	};

	return {
		formatDate,
		hasEventLabel,
		getBetChoices,
		getBetQuestion,
		getEventBreadcrumb,
	};
}
