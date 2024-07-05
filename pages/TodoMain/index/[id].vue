<template>
	<ClientOnly>
		<BaseDialog :show="true" :title="todoDetailData?.title" @close="gotoback" class="detail_container">
			<div class="container">
				<div class="container_des-container">
					<p>{{ todoDetailData?.des }}</p>
				</div>
				<div class="container_contents-status-container">
					<span class="container_contents-status-container_start">{{ todoDetailData?.start }} ~ </span>
					<span class="container_contents-status-container_deadline">{{ todoDetailData?.deadline }} 까지</span>
					<span class="container_contents-status-container_status">달성 여부 : {{ todoStatus }}</span>
				</div>
			</div>
		</BaseDialog>
	</ClientOnly>
</template>

<script setup lang="ts">
import { useTodoStore } from '~/store/TodosStore';

const store = useTodoStore();
const route = useRoute();
const router = useRouter();
const params = route.params.id;

const todoDetailData = computed(() => {
	return store.todoData.find((item) => item.id === params);
})

const gotoback = () => {
	router.go(-1);
}

const todoStatus = computed(() => {
	switch (todoDetailData?.value.status) {
		case 'active':
			return '진행중'
			break;
		case 'failed':
			return '실패함'
			break;
		case 'completed':
			return '성공함'
			break;
		default:
			return '';
	}
})

</script>

<style scoped lang="scss">
.container {

	&_des-container {

		p {
			line-height: 1.65rem;
			letter-spacing: 0.15px;

		}
	}

	&_contents-status-container {
		position: absolute;
		bottom: 1rem;
		font-size: .8rem;

		span {
			color: $color-gray-500;
		}

		&_deadline {
			margin-right: 1rem;
		}

		&_status {
			margin-left: 5rem;
		}
	}
}
</style>