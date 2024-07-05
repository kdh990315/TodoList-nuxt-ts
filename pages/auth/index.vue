<template>
	<div class="wrap">
		<div class="auth-container">
			<div class="content login-content" :class="{ 'hide': animationKey }">
				<div>
					<h2>Log in</h2>
					<form class="form_container" @submit.prevent="submitLoginForm">
						<input type="email" placeholder="이메일을 입력해주세요" required v-model="userLoginData.email"
							autocomplete="username">
						<input type="password" placeholder="비밀번호를 입력해주세요" required v-model="userLoginData.password"
							autocomplete="current-password">
						<button type="submit">로그인</button>
					</form>
				</div>
			</div>

			<div class="content signin-content" :class="{ 'hide': !animationKey }">
				<div>
					<h2>sign in</h2>
					<form class="form_container" @submit.prevent="submitSignupForm">
						<input type="email" placeholder="이메일을 입력해주세요" required v-model="userSigninData.email"
							autocomplete="username">
						<input type="password" placeholder="비밀번호를 입력해주세요" required v-model="userSigninData.password"
							autocomplete="new-password">
						<button type="submit">회원가입</button>
					</form>
				</div>
			</div>

			<div class="auth-switch">
				<div class="switch login-switch" :class="{ 'hide': animationKey }">
					<h3>회원가입이 하고싶다면?</h3>
					<button @click="authBtnHandler()">signin</button>
				</div>
				<div class="switch signup-switch" :class="{ 'hide': !animationKey }">
					<h3>로그인이 하고싶다면?</h3>
					<button @click="authBtnHandler()">login</button>
				</div>
			</div>
		</div>
		<div v-if="!isLoading" class="loading-box">
			<div class="loading-wrap">
				<VueSpinnerAudio size="100"></VueSpinnerAudio>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/store/authStore';
import { VueSpinnerAudio } from 'vue3-spinners';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

const isLoading = ref<boolean>(true);

interface userAuthData {
	email: string;
	password: string;
}

const animationKey = ref(false);

const authBtnHandler = () => {
	animationKey.value = !animationKey.value;
}

const userSigninData = ref<userAuthData>({
	email: '',
	password: '',
});

const userLoginData = ref<userAuthData>({
	email: '',
	password: '',
});

const submitLoginForm = async () => {
	try {
		isLoading.value = true;
		store.login({
			email: userLoginData.value.email,
			password: userLoginData.value.password
		});
	} catch (err) {
		console.error(err);
		return;
	} finally {
		isLoading.value = false
	}

	router.push('/TodoMain');
}

const submitSignupForm = async () => {
	try {

		isLoading.value = true;
		store.userSignin({
			email: userSigninData.value.email,
			password: userSigninData.value.password,
		});
	} catch (err) {
		console.error(err);
		return;
	} finally {
		isLoading.value = false;
	}

	router.push('/TodoMain');

}
</script>

<style scoped lang="scss">
.wrap {
	position: absolute;
	width: 100%;
	height: 100%;
	background: $color-white-000;

	.auth-container {
		position: absolute;
		width: 65rem;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.content {
			width: 420px;
			padding: 40px;
			height: 500px;
			top: 50%;
			transform: translateY(-50%);
			z-index: 1;
			position: absolute;
			background: $color-white-000;
			box-shadow: 0 0px 8px rgba(0, 0, 0, 0.1);
			border-top: 5px solid $color-main;
			// display: block;
			opacity: 1;

			&.login-content {
				left: 15%;
				transition: all 0.3s .3s ease-out;

				&.hide {
					opacity: 0;
					left: 20%;
					visibility: hidden;
					transition: all .3s ease-out;
				}
			}

			&.signin-content {
				right: 15%;
				transition: all 0.3s .3s ease-out;

				&.hide {
					opacity: 0;
					right: 20%;
					visibility: hidden;
					transition: all .3s ease-out;
				}
			}


			h2 {
				text-align: left;
				color: $color-main;
				text-transform: uppercase;
				letter-spacing: 1px;
				margin: 0;
				font-size: 18px;
				font-weight: bold;
			}

			.form_container {
				margin-top: 40px;

				input {
					margin-top: 20px;
					padding: 10px;
					border: none;
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
					border-radius: 0;
					box-shadow: none;
					color: $color-black-900;
				}

				button {
					display: inline-block;
					border: 2px solid $color-main;
					background: $color-main;
					border-radius: 25px;
					padding: 3px 12px 5px 12px;
					color: $color-white-000;
					font-size: 14px;
					font-weight: bold;
					position: absolute;
					bottom: 3rem;
					right: 3rem;
					cursor: pointer;
				}
			}
		}

		.auth-switch {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 660px;
			height: 400px;
			box-shadow: 0 0px 20px rgba(0, 0, 0, 0.03);

			&>div {
				width: 40%;
				margin-top: 125px;
				position: absolute;

				h3 {
					color: rgba(0, 0, 0, 0.4);
					text-align: center;
					font-size: 14px;
				}

				button {
					display: block;
					margin: 20px auto 0 auto;
					outline: 0;
					background: none;
					border: 2px solid rgba(0, 0, 0, 0.1);
					border-radius: 20px;
					color: rgba(0, 0, 0, 0.3);
					font-weight: bold;
					font-size: 14px;
					padding: 4px 12px 5px 12px;

					&:hover {
						border: 2px solid $color-main;
						color: rgba(0, 0, 0, 0.8);
					}
				}
			}

			.switch {
				display: block;
				top: 0;
				transition: all 0.3s .6s ease-out;

				&.login-switch {
					right: 0;
					opacity: 1;

					&.hide {
						opacity: 0;
						top: 20px;
						transition: all 0.3s ease-out;

					}
				}

				&.signup-switch {
					left: 0;
					opacity: 1;

					&.hide {
						opacity: 0;
						top: 20px;
						transition: all 0.3s ease-out;
					}
				}
			}
		}
	}

	.loading-box {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .1);
		position: relative;

		.loading-wrap {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>