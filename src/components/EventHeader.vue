<template>
	<div class="event-header">
		<div class="event-header__breadcrumb">
			{{ getEventBreadcrumb(event) }}
		</div>
		<div class="event-header__main">
			<div class="event-header__info">
				<span class="event-header__sport-icon">{{
					event.sport.icon
				}}</span>
				<span class="event-header__label">
					{{ hasEventLabel(event) ? event.label : 'Other Event' }}
				</span>
			</div>
			<div class="event-header__date">
				{{ formatDate(event.start) }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { useEventHelpers } from '../composables/useEventHelpers.js';
// Use helper functions
const { formatDate, hasEventLabel, getEventBreadcrumb } = useEventHelpers();

// Define props
defineProps({
	event: {
		type: Object,
		required: true,
	},
});
</script>

<style scoped>
.event-header {
	padding: 1rem;
	background-color: #f9fafb;
	border-radius: 0.25rem;
}

.event-header__breadcrumb {
	font-size: 0.875rem;
	color: #67798e;
	margin-bottom: 0.5rem;
}

.event-header__main {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.event-header__info {
	display: flex;
	align-items: center;
}

.event-header__sport-icon {
	margin-right: 0.5rem;
	font-size: 0.75rem;
	background-color: #ebeafc;
	color: #382cdd;
	padding: 0.25rem 0.5rem;
	border-radius: 5rem;
}

.event-header__label {
	font-weight: 500;
	font-size: 1.5rem;
}

.event-header__date {
	font-size: 0.875rem;
	color: #67798e;
}
</style>
