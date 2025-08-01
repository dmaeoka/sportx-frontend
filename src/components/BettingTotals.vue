<template>
	<div class="betting-totals">
		<div class="betting-totals__row">
			<span class="betting-totals__label">Total</span>
			<span class="betting-totals__value">{{ total }}€</span>
		</div>
		<div class="betting-totals__row">
			<span class="betting-totals__label">Potential Gain</span>
			<span class="betting-totals__value betting-totals__value--gain">{{ potentialGain }}€</span
			>
		</div>
	</div>
</template>

<script setup>
// Define props that this component can receive
defineProps({
	total: {
		type: String,
		required: true,
	},
	potentialGain: {
		type: String,
		required: true,
	},
});
</script>

<style scoped>
.betting-totals {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin: 1rem 0;
	padding: 0.75rem;
	background-color: #fff;
	border-radius: 0.375rem;
	border: 1px solid #d1d5db;
}

.betting-totals__row {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.betting-totals__label {
	font-size: 0.875rem;
	color: #64748b;
	font-weight: 500;
}

.betting-totals__value {
	font-size: 0.875rem;
	font-weight: 600;
	color: #1e293b;
}

.betting-totals__value--gain {
	color: #059669;
}
</style>
