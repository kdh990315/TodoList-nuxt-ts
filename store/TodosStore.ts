import axios from "axios";
import { defineStore } from "pinia"
import type { TodosType } from "~/types/TodosApiType";
import { useAuthStore } from "./authStore";

type status = 'active' | 'failed' | 'completed';

export const useTodoStore = defineStore('todos', () => {
	const authStore = useAuthStore();
	//state
	const todoData = ref<TodosType[]>([]);

	const selectedStatus = ref<status>('active');
	
	//getters
	const filteredChallenges = computed(() => ({
		active: todoData.value.filter((challenge) => challenge.status === 'active'),
		failed: todoData.value.filter((challenge) => challenge.status === 'failed'),
		completed: todoData.value.filter((challenge) => challenge.status === 'completed'),
	}));

	const userId = computed(() => authStore.userId);

	//actions
	async function newTodoData(payload: TodosType) {
		todoData.value.push(payload);
		
		if(!userId.value) {
			return;
		} else {
			try {
				await axios.post(`https://todolist-nuxt-ts-default-rtdb.firebaseio.com/todoList/${userId.value}.json`, {
					todoId: payload.id,
					title: payload.title,
					des: payload.des,
					start: payload.start,
					deadline: payload.deadline,
					status: payload.status,
				});

			} catch (error) {
				console.log(error);
			}
		}
	}
	async function updateTodoStatus(todoId: string, newStatus: string) {
		
		let todoUpdata = todoData.value.find(item => item.id === todoId);

		if(todoUpdata && !userId.value) {
			todoUpdata.status = newStatus;
		} else if(todoUpdata && userId.value) {
			todoUpdata.status = newStatus;
			
			try {
				await axios.patch(`https://todolist-nuxt-ts-default-rtdb.firebaseio.com/todoList/${userId.value}/${todoUpdata.key}.json`, {
					status: newStatus
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	async function setTodoData(payload: string | null) {
		const userId = payload;

		if(!userId) {
			return;
		} else {
			todoData.value = [];
			try {
				const response = await axios.get(`https://todolist-nuxt-ts-default-rtdb.firebaseio.com/todoList/${userId}.json`);
				
				const newTodoDatas: TodosType[] = [];

				for(let key in response.data) {
					const newData: TodosType = {
						id: response.data[key].todoId,
						title: response.data[key].title,
						des: response.data[key].des,
						start: response.data[key].start,
						deadline: response.data[key].deadline,
						status: response.data[key].status,
						key: key,
					}
					newTodoDatas.push(newData);
				}

				todoData.value = newTodoDatas;
			} catch (error) {
				console.log(error);
			} 
		}
	}

	function selectType(selectStatus: status) {
		selectedStatus.value = selectStatus;
	}

	async function deleteTodo(todoId: string) {
		const findTodoData = todoData.value.find((item) => item.id === todoId);
		
		if(findTodoData) {
			try {
				await axios.delete(`https://todolist-nuxt-ts-default-rtdb.firebaseio.com/todoList/${userId.value}/${findTodoData.key}.json`);
			} catch(error) {
				console.log(error);
			}
		}

		todoData.value = todoData.value.filter((todo) => todo.id !== todoId);

	}

	return {
		todoData,
		newTodoData,
		filteredChallenges,
		updateTodoStatus,
		selectedStatus,
		selectType,
		deleteTodo,
		setTodoData
	}
});