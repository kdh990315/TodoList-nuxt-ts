<template>
	<button class="tap" @click="handleClike" :class="props.todoType">
		<slot></slot>
		<span class="badge">{{ props.statusLength }}</span>
	</button>
</template>

<script setup lang="ts">

interface props {
	statusLength: number;
	todoType: string;
}

const props = defineProps<props>();

const emit = defineEmits(['click']);

const handleClike = () => {
	emit('click');
}


</script>

<style scoped lang="scss">
.tap {
	padding: 0.5rem 1rem;
	text-align: left;
	cursor: pointer;
	background-color: transparent;
	color: #b0caf9;
	border: none;
	box-shadow: none;
	display: flex;
	align-items: center;

	&:hover {
		color: $color-white-000;
	}

	&.on {
		border-bottom: 2px solid $color-main;
	}
	
	.badge {
		margin-left: 0.75rem;
		padding: 0.25rem 0.6rem;
		border-radius: 4px;
		background-color: $color-main;
		color: $color-white-000;
		font-size: 0.7rem;
	}

	&:not(:last-child) {
		margin-right: 1rem;
	}
}


</style>