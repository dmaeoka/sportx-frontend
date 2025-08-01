<!-- components/SuccessNotification.vue -->
<template>
	<div class="notification">
		<div class="notification__content">
			<div class="notification__main">
				<strong>Bets submitted successfully!</strong>
				<div class="notification__details">
					{{ submittedBets.length }} bet(s) for a total of
					{{ submittedTotal }}€ (Potential gain:
					{{ submittedPotentialGain }}€)
				</div>
			</div>
			<button @click="$emit('close')" class="notification__close">
				<Icon
					name="material-symbols:close-rounded"
					class="notification__close-icon"
				/>
			</button>
		</div>
	</div>
</template>

<script setup>
// Define props that the component expects
defineProps({
	submittedBets: {
		type: Array,
		required: true,
	},
	submittedTotal: {
		type: String,
		required: true,
	},
	submittedPotentialGain: {
		type: String,
		required: true,
	},
});

// Define events this component can emit
defineEmits(['close']);
</script>

<style scoped>
.notification {
	background-color: #dcfce7; /* green-100 equivalent */
	border: 1px solid #86efac; /* green-400 equivalent */
	color: #166534; /* green-700 equivalent */
	padding: 1rem;
	margin: 1rem;
	border-radius: .375rem;
}

.notification__content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.notification__main {
	flex: 1;
}

.notification__details {
	font-size: .875rem;
	margin-top: .25rem;
}

.notification__close {
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
	margin-left: 1rem;
}

.notification__close-icon {
	width: 1.5rem;
	height: 1.5rem;
	color: #166534; /* green-700 equivalent */
	transition: color 0.2s ease;
}

.notification__close:hover .notification__close-icon {
	color: #14532d; /* green-900 equivalent */
}
</style>
