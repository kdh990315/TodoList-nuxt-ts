<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>


<script setup lang="ts">
import { useAuthStore } from './store/authStore';

interface MetaObject {
  title?: string;
  meta?: {
    hid: string; 
    name: string; 
    content: string;
  } 
}

useHead<MetaObject>({
  title: 'TodoList Project 입니다.',
  meta: [
    { hid: 'description', name: 'description', content: '사용자의 할 일을 관리할 수 있는 프로젝트입니다.' },
    { hid: 'og:title', property: 'og:title', content: 'TodoList-nuxt' },
    { hid: 'og:description', property: 'og:description', content: '사용자의 할 일을 관리할 수 있는 프로젝트입니다.' },
    { hid: 'og:image', property: 'og:image', content: '/assets/images/mainpage.png' },
    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
    { hid: 'twitter:title', name: 'twitter:title', content: 'TodoList-nuxt' },
    { hid: 'twitter:description', name: 'twitter:description', content: '사용자의 할 일을 관리할 수 있는 프로젝트입니다.' },
    { hid: 'twitter:image', name: 'twitter:image', content: '/assets/images/mainpage.png' },
    { name: 'keywords', content: 'TodoList, 할 일 관리, 일정, 일정 관리, Nuxt.js'}
  ],
});

const AuthStore = useAuthStore();

onMounted(() => {
  AuthStore.autoLogin();
})
</script>