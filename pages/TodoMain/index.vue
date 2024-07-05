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