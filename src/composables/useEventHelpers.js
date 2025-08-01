// This composable contains all event-related utility functions
export function useEventHelpers() {
	/**
	 * Formats a date string into a readable format
	 * @param {string} dateString - ISO date string
	 * @returns {string} Formatted date like "15th of January 14:30"
	 */
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

	/**
	 * Checks if an event has a valid label
	 * @param {Object} event - Event object
	 * @returns {boolean} True if event has a non-empty label
	 */
	const hasEventLabel = (event) => {
		return Boolean(event.label && event.label.trim() !== '');
	};

	/**
	 * Gets betting choices from an event
	 * @param {Object} event - Event object with bet data
	 * @returns {Array} Array of betting choices
	 */
	const getBetChoices = (event) => {
		const betData = Object.values(event.bet)[0];
		return betData.choices;
	};

	/**
	 * Gets the betting question from an event
	 * @param {Object} event - Event object with bet data
	 * @returns {string} The betting question label
	 */
	const getBetQuestion = (event) => {
		const betData = Object.values(event.bet)[0];
		return betData.question.label;
	};

	/**
	 * Creates a breadcrumb string for an event
	 * @param {Object} event - Event object
	 * @returns {string} Breadcrumb like "Football / Premier League / Match"
	 */
	const getEventBreadcrumb = (event) => {
		return `${event.sport.label} / ${event.category.label} / ${event.competition.label}`;
	};

	// Return all the utility functions
	return {
		formatDate,
		hasEventLabel,
		getBetChoices,
		getBetQuestion,
		getEventBreadcrumb,
	};
}
