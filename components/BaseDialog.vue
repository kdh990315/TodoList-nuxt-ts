<template>
	<Teleport to="body">
		<div v-if="props.show">
			<div class="backdrop" @click="closeModal"></div>
			<dialog class="dialog" open :class="props.class">
				<span class="dialog_close-btn" @click="closeModal">
					<img src="@/assets/images/icons/close.png" alt="닫기">
				</span>
				<div class="dialog_title-container">
					<h2>{{ props.title }}</h2>
				</div>
				<slot></slot>
			</dialog>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
interface ModalProps {
	title: string;
	show: boolean;
	class?: string;
}

const props = withDefaults(defineProps<ModalProps>(), {
	title: '',
	show: false,
	class: undefined,
});

const emit = defineEmits<{
	(event: 'close'): void;
}>()

const closeModal = () => {
	emit('close');
}
</script>

<style scoped lang="scss">
.backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.75);
	z-index: 9;
}

.dialog {
	background-color: $color-white-000;
	position: fixed;

	@include position-center(40%, 50%);

	width: 500px;
	height: 500px;

	padding: 1.3rem 1.5rem;
	border-radius: 0.3rem;
	z-index: 100;
	border: none;

	&_close-btn {
		position: absolute;
    right: 1rem;
    top: 1rem;
		color: $color-black-900;
		cursor: pointer;

		img {
			width: 30px;
		}
	}

	&_title-container {
		width: 100%;
		height: 50px;

		h2 {
			font-size: 1.5rem;
			color: $color-black-900;
		}
	}

	&.detail-modal {
		background-color: #293a43;
		border: none;
	}

	&.detail_container {
		height: auto;
		min-height: 350px;
		background-color: #293a43;
		padding-bottom: 2rem;

		.dialog_title-container {
			margin-bottom: 2rem;

			h2 {
				color: $color-white-000;
			}
		}
	}
}
</style>