<template>
	<button type="button" v-if="!props.link" :class="props.class">
		<slot></slot>
	</button>
	<NuxtLink v-else :to="props.url">
		<slot></slot>
	</NuxtLink>
</template>

<script setup lang="ts">
interface Props {
	link: boolean;
	url?: string;
	class?: string;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
button,
a {
	display: inline-block;
	padding: 0.5rem 3rem;
	background-color: $color-main;
	color: $color-white-000;
	border-radius: 4px;
	text-decoration: none;
	font-family: 'Quicksand', sans-serif;
	font-size: 0.8rem;
	font-weight: bold;
	border: none;
	margin: 0 1rem;
	cursor: pointer;

	&:hover {
		background-color: #0f86ef;
	}

	&.submit-btn {
		position: absolute;
    right: 0;
    bottom: 1rem;
	}
}
</style>
