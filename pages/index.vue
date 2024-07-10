<template>
	<header class="intro-header">
		<div class="intro-header_content">
			<h1>Ready for a challenge?</h1>
			<div class="intro-header_content_btn-container">
				<BaseButton :link="true" url="/TodoMain">시작하기</BaseButton>
				<BaseButton :link="true" url="/auth">로그인하기</BaseButton>
			</div>
			<small>로그인을 하지 않아도 정상 작동되지만 데이터가 소실될 수 있습니다.</small>
		</div>
		<img src="@/assets/images/city.jpg" alt="backround Image" class="intro-header_bk-img">
		<img src="@/assets/images/hero.png" alt="intro Hero Image" class="intro-header_hero-img">
	</header>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.intro-header {
	width: 100vh;

	&_content {
		width: 40rem;
    position: absolute;
    top: 30%;
    left: calc(50% - 20rem);
    z-index: 1;
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    text-align: center;
		
		h1 {
			font-size: 3rem;
			color: $color-white-000;
			margin: 2rem 0;
		}

		small {
			text-shadow: none;
			color: $color-gray-500;
			display: inline-block;
			margin-top: 2rem;
		}
	}

	&_bk-img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		object-fit: cover;
	}

	&_hero-img {
		width: 20rem;
		max-width: 40%;
		position: absolute;
		bottom: 10%;
		left: 25%;
		object-fit: cover;
		filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.5));
	}
}
</style>