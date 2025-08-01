import { useBettingLogic } from '@/composables/useBettingLogic';
import { useEventHelpers } from '@/composables/useEventHelpers';
import { useSuccessMessage } from '@/composables/useSuccessMessage';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

// Mock data
const mockEvent = {
	id: 'event-1',
	label: 'Championship Final',
	sport: { label: 'Football', icon: '⚽' },
	category: { label: 'Premier League' },
	competition: { label: 'Final Match' },
	start: '2024-12-25T15:30:00Z',
	bet: {
		bet1: {
			question: { label: 'Who will win?' },
			choices: [
				{ id: 'choice-1', actor: { label: 'Team A' }, odd: 2.0 },
				{ id: 'choice-2', actor: { label: 'Team B' }, odd: 3.5 },
				{ id: 'choice-3', actor: { label: 'Draw' }, odd: 2.8 },
			],
		},
	},
};

const mockEventWithoutLabel = {
	id: 'event-2',
	label: '',
	sport: { label: 'Tennis', icon: '🎾' },
	category: { label: 'Grand Slam' },
	competition: { label: 'Wimbledon' },
	start: '2024-07-15T14:00:00Z',
	bet: {
		bet1: {
			question: { label: 'Winner?' },
			choices: [
				{ id: 'choice-4', actor: { label: 'Player A' }, odd: 1.8 },
				{ id: 'choice-5', actor: { label: 'Player B' }, odd: 2.2 },
			],
		},
	},
};

describe('useBettingLogic composable', () => {
	let selectedBets;
	let betAmount;
	let bettingLogic;

	beforeEach(() => {
		selectedBets = ref([]);
		betAmount = ref(1.0);
		bettingLogic = useBettingLogic(selectedBets, betAmount);
	});

	describe('Initial State', () => {
		it('starts with no selected bets and default amount', () => {
			expect(selectedBets.value).toHaveLength(0);
			expect(betAmount.value).toBe(1.0);
			expect(bettingLogic.betCount.value).toBe(0);
			expect(bettingLogic.hasBets.value).toBe(false);
			expect(bettingLogic.calculateTotal.value).toBe('0.00');
			expect(bettingLogic.calculatePotentialGain.value).toBe('0.00');
		});
	});

	describe('Adding and Removing Bets', () => {
		it('adds a bet correctly', () => {
			const choice = mockEvent.bet.bet1.choices[0];
			bettingLogic.toggleBet(mockEvent, choice);

			expect(selectedBets.value).toHaveLength(1);
			expect(selectedBets.value[0]).toEqual({
				key: 'event-1-choice-1',
				eventLabel: 'Championship Final',
				choiceLabel: 'Team A',
				odd: 2.0,
				question: 'Who will win?',
				eventId: 'event-1',
				choiceId: 'choice-1',
			});
			expect(bettingLogic.betCount.value).toBe(1);
			expect(bettingLogic.hasBets.value).toBe(true);
		});

		it('toggles (removes) a selected bet', () => {
			const choice = mockEvent.bet.bet1.choices[0];
			bettingLogic.toggleBet(mockEvent, choice);
			expect(selectedBets.value).toHaveLength(1);

			bettingLogic.toggleBet(mockEvent, choice);
			expect(selectedBets.value).toHaveLength(0);
			expect(bettingLogic.betCount.value).toBe(0);
			expect(bettingLogic.hasBets.value).toBe(false);
		});

		it('adds multiple bets from same event', () => {
			const [choiceA, choiceB] = mockEvent.bet.bet1.choices;
			bettingLogic.toggleBet(mockEvent, choiceA);
			bettingLogic.toggleBet(mockEvent, choiceB);

			expect(selectedBets.value).toHaveLength(2);
			expect(bettingLogic.betCount.value).toBe(2);
			expect(selectedBets.value[0].choiceLabel).toBe('Team A');
			expect(selectedBets.value[1].choiceLabel).toBe('Team B');
		});

		it('removes a specific bet by key', () => {
			const [choiceA, choiceB] = mockEvent.bet.bet1.choices;
			bettingLogic.toggleBet(mockEvent, choiceA);
			bettingLogic.toggleBet(mockEvent, choiceB);

			bettingLogic.removeBet('event-1-choice-1');

			expect(selectedBets.value).toHaveLength(1);
			expect(selectedBets.value[0].choiceLabel).toBe('Team B');
		});

		it('clears all bets', () => {
			const [choiceA, choiceB] = mockEvent.bet.bet1.choices;
			bettingLogic.toggleBet(mockEvent, choiceA);
			bettingLogic.toggleBet(mockEvent, choiceB);

			bettingLogic.clearAllBets();

			expect(selectedBets.value).toHaveLength(0);
			expect(bettingLogic.hasBets.value).toBe(false);
		});
	});

	describe('Bet Selection Checking', () => {
		it('checks if a bet is selected', () => {
			const choice = mockEvent.bet.bet1.choices[0];
			expect(bettingLogic.isSelected(mockEvent.id, choice.id)).toBe(
				false
			);

			bettingLogic.toggleBet(mockEvent, choice);
			expect(bettingLogic.isSelected(mockEvent.id, choice.id)).toBe(true);
		});

		it('correctly identifies unselected bets', () => {
			const [choiceA, choiceB] = mockEvent.bet.bet1.choices;
			bettingLogic.toggleBet(mockEvent, choiceA);

			expect(bettingLogic.isSelected(mockEvent.id, choiceA.id)).toBe(
				true
			);
			expect(bettingLogic.isSelected(mockEvent.id, choiceB.id)).toBe(
				false
			);
		});
	});

	describe('Amount Management', () => {
		it('increases bet amount correctly', () => {
			bettingLogic.increaseBetAmount();
			expect(betAmount.value).toBe(1.1);

			bettingLogic.increaseBetAmount();
			expect(betAmount.value).toBe(1.2);
		});

		it('decreases bet amount correctly', () => {
			betAmount.value = 2.0;
			bettingLogic.decreaseBetAmount();
			expect(betAmount.value).toBe(1.9);
		});

		it('enforces minimum bet amount', () => {
			betAmount.value = 0.2;
			bettingLogic.decreaseBetAmount();
			expect(betAmount.value).toBe(0.1);

			bettingLogic.decreaseBetAmount();
			expect(betAmount.value).toBe(0.1); // Should not go below 0.1
		});

		it('updates bet amount with validation', () => {
			bettingLogic.updateBetAmount('5.5');
			expect(betAmount.value).toBe(5.5);

			bettingLogic.updateBetAmount('0.05'); // Below minimum
			expect(betAmount.value).toBe(5.5); // Should not change

			bettingLogic.updateBetAmount('invalid');
			expect(betAmount.value).toBe(5.5); // Should not change
		});

		it('rounds amounts correctly', () => {
			betAmount.value = 1.0;
			for (let i = 0; i < 3; i++) {
				bettingLogic.increaseBetAmount();
			}
			expect(betAmount.value).toBe(1.3); // Should be exactly 1.3, not 1.2999999
		});
	});

	describe('Calculations', () => {
		it('calculates total correctly with single bet', () => {
			const choice = mockEvent.bet.bet1.choices[0];
			bettingLogic.toggleBet(mockEvent, choice);

			expect(bettingLogic.calculateTotal.value).toBe('1.00');

			betAmount.value = 2.5;
			expect(bettingLogic.calculateTotal.value).toBe('2.50');
		});

		it('calculates total correctly with multiple bets', () => {
			const [choiceA, choiceB] = mockEvent.bet.bet1.choices;
			bettingLogic.toggleBet(mockEvent, choiceA);
			bettingLogic.toggleBet(mockEvent, choiceB);

			expect(bettingLogic.calculateTotal.value).toBe('2.00');

			betAmount.value = 1.5;
			expect(bettingLogic.calculateTotal.value).toBe('3.00');
		});

		it('calculates potential gain correctly', () => {
			const [choiceA, choiceB] = mockEvent.bet.bet1.choices;
			bettingLogic.toggleBet(mockEvent, choiceA); // odd: 2.0
			bettingLogic.toggleBet(mockEvent, choiceB); // odd: 3.5

			expect(bettingLogic.calculatePotentialGain.value).toBe('5.50'); // 2.0 + 3.5 = 5.5

			betAmount.value = 2.0;
			expect(bettingLogic.calculatePotentialGain.value).toBe('11.00'); // 2.0 * (2.0 + 3.5)
		});

		it('returns zero for calculations with no bets', () => {
			expect(bettingLogic.calculateTotal.value).toBe('0.00');
			expect(bettingLogic.calculatePotentialGain.value).toBe('0.00');
		});
	});

	describe('Bet Submission', () => {
		it('submits bets successfully', () => {
			const choice = mockEvent.bet.bet1.choices[0];
			bettingLogic.toggleBet(mockEvent, choice);
			betAmount.value = 2.0;

			const consoleSpy = vi
				.spyOn(console, 'log')
				.mockImplementation(() => {});

			const result = bettingLogic.submitBets();

			expect(result).toEqual({
				bets: [
					{
						key: 'event-1-choice-1',
						eventLabel: 'Championship Final',
						choiceLabel: 'Team A',
						odd: 2.0,
						question: 'Who will win?',
						eventId: 'event-1',
						choiceId: 'choice-1',
					},
				],
				amount: 2.0,
				total: '2.00',
				potentialGain: '4.00',
				timestamp: expect.any(String),
			});

			expect(selectedBets.value).toHaveLength(0); // Should be cleared
			expect(betAmount.value).toBe(1.0); // Should be reset

			consoleSpy.mockRestore();
		});

		it('throws error when submitting with no bets', () => {
			expect(() => bettingLogic.submitBets()).toThrow('No bets selected');
		});
	});
});

describe('useSuccessMessage composable', () => {
	let successMessage;

	beforeEach(() => {
		successMessage = useSuccessMessage();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('starts with hidden success message', () => {
		expect(successMessage.showSuccessMessage.value).toBe(false);
		expect(successMessage.submittedBets.value).toHaveLength(0);
		expect(successMessage.submittedTotal.value).toBe('');
		expect(successMessage.submittedPotentialGain.value).toBe('');
	});

	it('shows success message with correct data', () => {
		const mockBets = [{ key: 'test-bet', eventLabel: 'Test Event' }];

		successMessage.showSuccess(mockBets, '5.00', '10.00');

		expect(successMessage.showSuccessMessage.value).toBe(true);
		expect(successMessage.submittedBets.value).toEqual(mockBets);
		expect(successMessage.submittedTotal.value).toBe('5.00');
		expect(successMessage.submittedPotentialGain.value).toBe('10.00');
	});

	it('auto-hides success message after 5 seconds', () => {
		successMessage.showSuccess([], '0.00', '0.00');
		expect(successMessage.showSuccessMessage.value).toBe(true);

		vi.advanceTimersByTime(5000);
		expect(successMessage.showSuccessMessage.value).toBe(false);
	});

	it('closes success message manually', () => {
		successMessage.showSuccess([], '0.00', '0.00');
		expect(successMessage.showSuccessMessage.value).toBe(true);

		successMessage.closeSuccessMessage();
		expect(successMessage.showSuccessMessage.value).toBe(false);
	});

	it('creates a copy of bets array', () => {
		const originalBets = [{ key: 'test-bet' }];
		successMessage.showSuccess(originalBets, '1.00', '2.00');

		originalBets.push({ key: 'new-bet' });
		expect(successMessage.submittedBets.value).toHaveLength(1); // Should not be affected
	});
});

describe('useEventHelpers composable', () => {
	let eventHelpers;

	beforeEach(() => {
		eventHelpers = useEventHelpers();
	});

	describe('Date Formatting', () => {
		it('formats date correctly', () => {
			const dateString = '2024-12-25T15:30:00Z';
			const formatted = eventHelpers.formatDate(dateString);

			expect(formatted).toMatch(/25th of December 15:30/);
		});

		it('handles different date formats', () => {
			const dateString = '2024-01-01T09:00:00Z';
			const formatted = eventHelpers.formatDate(dateString);

			expect(formatted).toMatch(/1th of January 09:00/);
		});
	});

	describe('Event Label Validation', () => {
		it('returns true for valid event label', () => {
			expect(eventHelpers.hasEventLabel(mockEvent)).toBe(true);
		});

		it('returns false for empty event label', () => {
			expect(eventHelpers.hasEventLabel(mockEventWithoutLabel)).toBe(
				false
			);
		});

		it('returns false for whitespace-only label', () => {
			const eventWithWhitespace = { ...mockEvent, label: '   ' };
			expect(eventHelpers.hasEventLabel(eventWithWhitespace)).toBe(false);
		});

		it('returns false for null/undefined label', () => {
			const eventWithNull = { ...mockEvent, label: null };
			const eventWithUndefined = { ...mockEvent, label: undefined };

			expect(eventHelpers.hasEventLabel(eventWithNull)).toBe(false);
			expect(eventHelpers.hasEventLabel(eventWithUndefined)).toBe(false);
		});
	});

	describe('Bet Data Extraction', () => {
		it('gets bet choices correctly', () => {
			const choices = eventHelpers.getBetChoices(mockEvent);

			expect(choices).toHaveLength(3);
			expect(choices[0]).toEqual({
				id: 'choice-1',
				actor: { label: 'Team A' },
				odd: 2.0,
			});
		});

		it('gets bet question correctly', () => {
			const question = eventHelpers.getBetQuestion(mockEvent);
			expect(question).toBe('Who will win?');
		});

		it('creates event breadcrumb correctly', () => {
			const breadcrumb = eventHelpers.getEventBreadcrumb(mockEvent);
			expect(breadcrumb).toBe('Football / Premier League / Final Match');
		});
	});

	describe('Edge Cases', () => {
		it('handles events with missing bet data gracefully', () => {
			const eventWithoutBet = { ...mockEvent, bet: {} };

			expect(() => eventHelpers.getBetChoices(eventWithoutBet)).toThrow();
			expect(() =>
				eventHelpers.getBetQuestion(eventWithoutBet)
			).toThrow();
		});

		it('handles events with complex bet structures', () => {
			const complexEvent = {
				...mockEvent,
				bet: {
					mainBet: {
						question: { label: 'Main question?' },
						choices: [
							{
								id: 'c1',
								actor: { label: 'Option 1' },
								odd: 1.5,
							},
						],
					},
					sideBet: {
						question: { label: 'Side question?' },
						choices: [
							{
								id: 'c2',
								actor: { label: 'Option 2' },
								odd: 2.5,
							},
						],
					},
				},
			};

			// Should get the first bet object (mainBet in this case)
			const choices = eventHelpers.getBetChoices(complexEvent);
			expect(choices[0].actor.label).toBe('Option 1');
		});
	});
});

describe('Integration Tests', () => {
	it('works with all composables together', () => {
		const selectedBets = ref([]);
		const betAmount = ref(1.0);
		const bettingLogic = useBettingLogic(selectedBets, betAmount);
		const successMessage = useSuccessMessage();
		const eventHelpers = useEventHelpers();

		// Add a bet
		const choice = mockEvent.bet.bet1.choices[0];
		bettingLogic.toggleBet(mockEvent, choice);

		// Submit bets
		const submissionData = bettingLogic.submitBets();

		// Show success message
		successMessage.showSuccess(
			submissionData.bets,
			submissionData.total,
			submissionData.potentialGain
		);

		// Verify integration
		expect(successMessage.showSuccessMessage.value).toBe(true);
		expect(successMessage.submittedBets.value[0].choiceLabel).toBe(
			'Team A'
		);
		expect(bettingLogic.hasBets.value).toBe(false); // Should be cleared after submission
	});
});
