<template>
	<form @submit="submitForm">
		<p>
			<label for="title">제목</label>
			<input type="text" id="title" name="title" v-model="formData.title" :class="{ 'error': errors.title }">
		</p>

		<p>
			<label for="des">내용</label>
			<textarea name="des" id="des" v-model="formData.des" :class="{ 'error': errors.des }"></textarea>
		</p>

		<p>
			<label for="start">시작일</label>
			<input type="date" id="start" name="start" v-model="formData.start" :class="{ 'error': errors.start }">
		</p>

		<p>
			<label for="deadline">마감일</label>
			<input type="date" id="deadline" name="deadline" v-model="formData.deadline" :class="{ 'error': errors.deadline }">
		</p>

		<BaseButton :link="false" class="submit-btn" @click="submitForm">등록하기</BaseButton>
	</form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useTodoStore } from '~/store/TodosStore';
import type { FormType } from '~/types/FormType';

const store = useTodoStore();

const emit = defineEmits<{
	(evnet: 'submitSuccess'): void;
}>();

const formData = ref<FormType>({
	title: '',
	des: '',
	deadline: '',
	start: '',
});

const errors = reactive({
	title: false,
	des: false,
	deadline: false,
	start: false,
})

const submitForm = (ev: Event) => {
	ev.preventDefault();

	errors.title = false;
  errors.des = false;
  errors.deadline = false;
  errors.start = false;

	if (formData.value.title.trim() === '') {
		errors.title = true;
	}
	if (formData.value.des.trim() === '') {
		errors.des = true;
	}
	if (formData.value.deadline.trim() === '') {
		errors.deadline = true;
	}
	if (formData.value.start.trim() === '') {
		errors.start = true;
	}

	const startDate = new Date(formData.value.start);
	const deadlineDate = new Date(formData.value.deadline);

	if(deadlineDate < startDate) {
		alert('마감일이 시작일보다 빠를 수 없습니다.');
		return;
	}

	if (errors.title || errors.des || errors.deadline || errors.start) {
		return;
	} else {
		store.newTodoData({
			id: Math.random().toString(),
			title: formData.value.title,
			des: formData.value.des,
			start: formData.value.start,
			deadline: formData.value.deadline,
			status: 'active',
		});
		
		emit('submitSuccess');
	}
}

</script>

<style scoped lang="scss">
p {
	margin: 1rem 0;

	label {
		display: block;
		margin-bottom: 0.15rem;
		font-weight: bold;
		font-size: 0.8rem;
		color: $color-black-900;
	}

	.error {
		border: 1px solid $color-error-500;
	}

	input {
		display: block;
		width: 100%;
		padding: 0.5rem;
		border-radius: 4px;
		border: 1px solid $color-gray-300;
		color: $color-gray-600;
		font-size: 0.8rem;
	}

	textarea {
		display: block;
		width: 100%;
		padding: 0.5rem;
		border-radius: 4px;
		border: 1px solid $color-gray-300;
		color: $color-gray-600;
		font-size: 0.8rem;
	}
}
</style>