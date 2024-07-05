import axios from "axios";
import { defineStore } from "pinia"
import { useTodoStore } from "./TodosStore";

interface userPayload {
	email: string;
	password: string;
}

interface userData {
	userId: string | null,
	token: string | null,
}

export const useAuthStore = defineStore('auth', () => {
	const TodoStore = useTodoStore();

	const API_KEY = 'AIzaSyASZGv0RQ2pxut3PNR7FNEGMAThBUa9YJE';

	//state
	const userData = ref<userData>({
		userId: null,
		token: null,
	});

	//getters
	const loginStatus = computed(() => {
		return userData.value.token !== null;
	});

	const userId = computed(() => userData.value.userId);

	//actions
	async function login(payload: userPayload) {
		try {
			const response = await axios.post(`
				https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}
				`, {
				email: payload.email,
				password: payload.password,
				returnSecureToken: true,
			});
			
			userData.value.userId = response.data.localId;
			userData.value.token = response.data.idToken;

			localStorage.setItem('userId', response.data.localId);
			localStorage.setItem('token', response.data.idToken);

		} catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error.message;
        authErrorHandler(errorMessage);
      } else {
        console.error('인증 과정에서 문제가 발생하였습니다.');
      }
    }		
	}

	async function userSignin(payload: userPayload) {

		try {
			const response = await axios.post(`
				https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}
				`, {
				email: payload.email,
				password: payload.password,
				tokenExpiration: true,
			});

			userData.value.userId = response.data.localId;
			userData.value.token = response.data.idToken;

			localStorage.setItem('userId', response.data.localId);
			localStorage.setItem('token', response.data.idToken);

		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw new Error(error.response.data.message || '인증 과정에서 문제가 발생하였습니다.');
			} else {
				throw new Error('인증 과정에서 문제가 발생하였습니다.');
			}
		} 
	}

	function logout() {
		TodoStore.todoData = [];

		localStorage.removeItem('userId');
		localStorage.removeItem('token');

		userData.value.userId = null;
		userData.value.token = null;
	}

	function authErrorHandler(errorMessage: string) {
		switch (errorMessage) {

			case 'EMAIL_NOT_FOUND': 
				alert('이 식별자에 해당하는 사용자 기록이 없습니다. 사용자가 삭제되었을 수 있습니다.');
				break;
			case 'INVALID_PASSWORD':
				alert('비밀번호가 유효하지 않거나 사용자에게 비밀번호가 없습니다.');
				break;
			case 'USER_DISABLED':
				alert('관리자가 사용자 계정을 비활성화했습니다.');
				break;
			default: 
				alert('인증 과정에서 문제가 발생하였습니다.');
		}
	}

	return {
		userSignin,
		userData,
		logout,
		login,
		loginStatus,
		userId
	}
});