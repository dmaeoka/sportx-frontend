<template>
	<div class="betting-slip">
		<div class="betting-slip__header">
			<h3 class="betting-slip__title">My Choices</h3>
		</div>

		<div class="betting-slip__content">
			<!-- Empty state if theres no bets -->
			<div v-if="!hasBets" class="betting-slip__empty">
				No bets chosen
			</div>

			<!-- All the bets selectsd -->
			<div v-else class="betting-slip__bets">
				<BetCard
					v-for="bet in selectedBets"
					:key="bet.key"
					:bet="bet"
					@remove="$emit('remove-bet', bet.key)"
				/>
			</div>

			<!-- Add or Remove value -->
			<div class="betting-slip__controls">
				<AmountControl
					:amount="betAmount"
					@update="$emit('update-amount', $event)"
					@increase="$emit('increase-amount')"
					@decrease="$emit('decrease-amount')"
				/>

				<!-- Betting totals -->
				<BettingTotals
					:total="calculateTotal"
					:potential-gain="calculatePotentialGain"
				/>

				<!-- Submit button -->
				<SubmitButton
					:has-bets="hasBets"
					:bet-count="betCount"
					@submit="$emit('submit')"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import AmountControl from './AmountControl.vue';
import BetCard from './BetCard.vue';
import BettingTotals from './BettingTotals.vue';
import SubmitButton from './SubmitButton.vue';

// Define props
defineProps({
	selectedBets: {
		type: Array,
		required: true,
	},
	betAmount: {
		type: Number,
		required: true,
	},
	calculateTotal: {
		type: String,
		required: true,
	},
	calculatePotentialGain: {
		type: String,
		required: true,
	},
	betCount: {
		type: Number,
		required: true,
	},
	hasBets: {
		type: Boolean,
		required: true,
	},
});

// Define events
defineEmits([
	'remove-bet',
	'update-amount',
	'increase-amount',
	'decrease-amount',
	'submit',
]);
</script>

<style scoped>
.betting-slip {
	width: 100%;
	background-color: #f9fafb;
}

@media (min-width: 768px) {
	.betting-slip {
		width: 20rem;
	}
}

.betting-slip__header {
	padding: 1rem;
	border-bottom: 1px solid #d1d5db;
}

.betting-slip__title {
	font-weight: bold;
	font-size: 1.125rem;
	margin: 0;
}

.betting-slip__content {
	padding: 1rem;
}

.betting-slip__empty {
	color: #67798e;
	font-style: italic;
	text-align: center;
	padding: 2rem 0;
}

.betting-slip__bets {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	margin-bottom: 1.5rem;
}

.betting-slip__controls {
	border-top: 1px solid #d1d5db;
	padding-top: 1rem;
}
</style>
