<template>
	<div>
		<HeaderSection></HeaderSection>
		<div class="main">

			<div class="tap-menu">
				<tap :statusLength="store.filteredChallenges.active.length" @click="selectType('active')" :todoType="TodoTypes === 'active' ? 'on': ''">진행중</tap>
				<tap :statusLength="store.filteredChallenges.failed.length" @click="selectType('failed')" :todoType="TodoTypes === 'failed' ? 'on': ''">실패</tap>
				<tap :statusLength="store.filteredChallenges.completed.length" @click="selectType('completed')" :todoType="TodoTypes === 'completed' ? 'on': ''">완료</tap>
			</div>
		
			<TodoContents></TodoContents>
		</div>
	</div>
	<NuxtPage></NuxtPage>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'TodoList Project 입니다.',
  meta: [
    { hid: 'description', name: 'description', content: '사용자의 할 일을 관리할 수 있는 프로젝트입니다.' },
    { hid: 'og:title', property: 'og:title', content: 'TodoList-nuxt' },
    { hid: 'og:description', property: 'og:description', content: '사용자의 할 일을 관리할 수 있는 프로젝트입니다.' },
    { hid: 'og:image', property: 'og:image', content: '/assets/images/main.png' },
    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
    { hid: 'twitter:title', name: 'twitter:title', content: 'TodoList-nuxt' },
    { hid: 'twitter:description', name: 'twitter:description', content: '사용자의 할 일을 관리할 수 있는 프로젝트입니다.' },
    { hid: 'twitter:image', name: 'twitter:image', content: '/assets/images/main.png' },
    { name: 'keywords', content: 'TodoList, 할 일 관리, 일정, 일정 관리, Nuxt.js'}
  ],
})

import tap from './components/tap.vue';
import HeaderSection from './components/HeaderSection.vue';
import TodoContents from './components/TodoContents.vue';
import { useTodoStore } from '~/store/TodosStore';

const store = useTodoStore();

const selectType = (selectStatus: 'active' | 'failed' | 'completed') => {
	store.selectType(selectStatus);
}

const TodoTypes = computed(() => store.selectedStatus);

</script>

<style scoped lang="scss">
.main {
	width: 50rem;
	background-color: #22323a;
	margin: 0 auto;
	padding: .5rem 1rem;

	.tap-menu {
		display: flex;
    align-items: center;
	}
}
</style>