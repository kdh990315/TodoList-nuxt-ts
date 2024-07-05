<template>
	<div>
		<header class="header">
			<h1>Your Challenges</h1>
			<div class="header_btn-box">
				<BaseButton :link="false" @click="modalShowHandler">챌린지 추가하기</BaseButton>
				<BaseButton :link="true" url="/auth" v-if="!loginStatus">로그인하기</BaseButton>
				<BaseButton :link="false" v-else @click="store.logout">로그아웃하기</BaseButton>
			</div>
		</header>
	</div>
	<BaseDialog title="챌린지 등록하기" :show="modalVisible" @close="modalShowHandler">
		<TodoForm @submitSuccess="modalShowHandler"></TodoForm>
	</BaseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TodoForm from './TodoForm.vue';
import { useAuthStore } from '~/store/authStore';

const store = useAuthStore();

const modalVisible = ref(false);

const modalShowHandler = () => {
	modalVisible.value = !modalVisible.value;
}

const loginStatus = computed(() => store.loginStatus)

</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
	width: 50rem;
  margin: 2rem auto;
	font-family: "Quicksand", sans-serif;

	h1 {
		font-size: 1.5rem;
	}

	&_btn-box {
		float: right;
	}
}
</style>