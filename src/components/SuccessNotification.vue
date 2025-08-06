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
			<button
				type="button"
				class="notification__close"
				@click="$emit('close')"
			>
				<Icon
					name="material-symbols:close-rounded"
					class="notification__close-icon"
				/>
			</button>
		</div>
	</div>
</template>

<script setup>
// Which props the component is expecting
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

// emit close on click
defineEmits(['close']);
</script>

<style scoped>
.notification {
	--text-colour: #166534;
	--text-colour-hover: #14532d;
	--notification-bg-colour: #dcfce7;
	--notification-border-colour: #86efac;

	background-color: var(--notification-bg-colour);
	border: 1px solid var(--notification-border-colour);
	color: var(--text-colour);
	padding: 1rem;
	margin: 1rem;
	border-radius: 0.375rem;
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
	font-size: 0.875rem;
	margin-top: 0.25rem;
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
	color: var(--text-colour);
	transition: color 0.2s ease;
}

.notification__close:hover .notification__close-icon {
	color: var(--text-colour-hover);
}
</style>
