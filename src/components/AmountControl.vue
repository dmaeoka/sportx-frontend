<template>
	<div class="amount-control">
		<label class="amount-control__label">Amount</label>
		<div class="amount-control__input-group">
			<button
				@click="$emit('decrease')"
				class="amount-control__button"
				aria-label="Decrease amount"
			>
				<Icon
					name="material-symbols:remove"
					class="amount-control__icon"
				/>
			</button>
			<input
				:value="amount"
				@input="handleInput"
				type="number"
				step="0.1"
				min="0.1"
				class="amount-control__input"
				aria-label="Bet amount"
			/>
			<button
				@click="$emit('increase')"
				class="amount-control__button"
				aria-label="Increase amount"
			>
				<Icon
					name="material-symbols:add"
					class="amount-control__icon"
				/>
			</button>
		</div>
	</div>
</template>

<script setup>
// Define props that this component can receive
defineProps({
	amount: {
		type: Number,
		required: true,
		validator: (value) => value >= 0.1,
	},
});

// Define events taht this component can emit
const emit = defineEmits(['update', 'increase', 'decrease']);

// Handle input changes
const handleInput = (event) => {
	// Emit the update event with the new amount
	emit('update', event.target.value);
};
</script>

<style scoped>
.amount-control {
	margin-bottom: 1rem;
}

.amount-control__label {
	display: block;
	font-size: 0.875rem;
	font-weight: 500;
	margin-bottom: 0.5rem;
	color: #374151;
}

.amount-control__input-group {
	display: flex;
	align-items: stretch;
	gap: 0.5rem;
}

.amount-control__button {
	border: 1px solid #d1d5db;
	border-radius: 0.375rem;
	background-color: white;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
	transition: all 0.2s ease;
	min-width: 2.5rem;
}

.amount-control__button:hover {
	background-color: #f3f4f6;
	border-color: #9ca3af;
}

.amount-control__button:active {
	transform: scale(0.95);
}

.amount-control__icon {
	width: 1.25rem;
	height: 1.25rem;
	color: #6b7280;
}

.amount-control__input {
	flex: 1;
	padding: 0.5rem;
	border: 1px solid #d1d5db;
	border-radius: 0.375rem;
	text-align: center;
	font-size: 0.875rem;
	font-weight: 500;
	transition: border-color 0.2s ease;
}

.amount-control__input:focus {
	outline: none;
	border-color: #3b82f6;
	box-shadow: 0 0 0 1px #3b82f6;
}
</style>
