<template>
	<div class="todo-container">
		<article class="todo-container_content" v-for="todoData in filteredChallengesData" :key="todoData.id"
			v-if="filteredChallengesData.length > 0">
			<div class="todo-container_content_left">
				<h3>{{ todoData.title }}</h3>
				<div class="todo-container_content_left_date-container">
					<p>{{ todoData.start }} 등록</p>
					<p>{{ todoData.deadline }}까지</p>
				</div>
				<span class="todo-container_content_left_delete-icon" @click="deleteHandler(todoData.id, todoData.title)">
					<img src="@/assets/images/icons/delete-icon.png" alt="삭제 아이콘">
				</span>
			</div>
			<div class="todo-container_detail-btn-container">
				<NuxtLink class="todo-container_detail-btn-container_detail-btn" :to="`/TodoMain/${todoData.id}`">detail view</NuxtLink>
			</div>
			<div class="todo-container_content-right">
				<span class="todo-container_content-right_btn failed" 
				@click="updateTodoStatus(todoData.id, 'failed')">challenge failed</span>
				<span class="todo-container_content-right_btn completed"
					@click="updateTodoStatus(todoData.id, 'completed')">challenge completed</span>
			</div>
		</article>
		<article class="no-contents" v-else>
			<span>조회 가능한 챌린지가 없습니다.</span>
		</article>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTodoStore } from '~/store/TodosStore';
import { useAuthStore } from '~/store/authStore';

const authStore = useAuthStore();
const store = useTodoStore();

const updateTodoStatus = (todoId: string, status: 'active' | 'failed' | 'completed') => {
	store.updateTodoStatus(todoId, status);
}

const filteredChallengesData = computed(() => {
	return store.filteredChallenges[store.selectedStatus];
})

const deleteHandler = (todoId: string, todoTitle: string) => {
	const confirmation = confirm(`'${todoTitle}'을 정말 삭제하시겠습니까?`);
	if (confirmation) {
		store.deleteTodo(todoId);
	}
}

onMounted(async() => {
	watchEffect(() => {
		store.setTodoData(authStore.userId);
	});
})
</script>

<style scoped lang="scss">
.todo-container {

	&_content {
		width: 100%;
		height: 150px;
		margin: 1rem 0;
		position: relative;
		background-color: #293a43;
	}

	.no-contents {
		padding: 2rem 0 2rem 1rem;
	}

	&_content_left {
		padding: 1rem;

		h3 {
			font-size: 1.3rem;
			margin-bottom: .3rem;
			color: $color-white-200;
		}
		
		&_date-container {
			display: flex;
    	justify-content: space-between;

			p {
				font-size: .8rem;
				color: $color-gray-300;
				&:last-child {
					margin-right: 3rem;
				}
			}
		}


		&_delete-icon {
			position: absolute;
			right: 1rem;
			top: 1rem;
			width: 1.9rem;
			cursor: pointer;

			img {
				width: 100%;
			}
		}
	}

	&_detail-btn-container {
		position: absolute;
		left: 1rem;
		bottom: 1rem;

		&_detail-btn {
			font-size: .9rem;
			font-family: 'Quicksand', sans-serif;
			color: $color-main;
			transition: opacity .3s;
			cursor: pointer;

			&:hover {
				opacity: .75;
			}
		}
	}

	&_content-right {
		position: absolute;
		bottom: 1rem;
		right: 1rem;

		&_btn {
			font-size: .9rem;
			font-family: 'Quicksand', sans-serif;
			transition: opacity .3s;
			cursor: pointer;

			&.failed {
				margin-right: 2rem;
				color: $color-pink-700;
			}

			&.completed {
				color: $color-lightBlue-600;
			}

			&:hover {
				opacity: .75;
			}
		}
	}
}
</style>