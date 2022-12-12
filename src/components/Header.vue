<template>
<div class="header-container">
	<nav class="navigation">
		<a v-on:click="handleHome" class="logo">Pesquise</a>
		<ul v-if="userStore?.isUserIn" class="navigation-options">
			<li v-if="userStore.user?.is_staff"><router-link to="/learning-objects">Objetos</router-link></li>
			<Separator v-if="userStore.user?.is_staff" />
			<li><router-link to="/library">Biblioteca</router-link></li>
			<Separator />
			<li ref="dropDown" @click="toggleOpen">
				<fa  v-if="isOpen" icon="fa-chevron-up" />
				<fa v-else icon="fa-chevron-down" />
				<img v-if="userStore?.socialUser?.picture" referrerpolicy="no-referrer" class="user-image" :src="userImage">
				<fa v-else class="user-icon" icon="fa-user-circle" />
				<span @click="toggleOpen" >{{ userStore.user?.name.split(' ')[0] }}</span>
				<ul class="drop-down" @click="stopPropagation" v-if="isOpen">
					<li @click="handleLogout">
						<router-link to="">Sair</router-link>
						<fa icon="fa-arrow-right-from-bracket" color="red" />
					</li>
				</ul>
			</li>
		</ul>
		<ul v-else class="navigation-options">
			<li>
				<router-link @click="handleLogout" to="/signin">Entrar</router-link>
			</li>
		</ul>
	</nav>
</div>
</template>
<script setup lang="ts">
	import logout from '@/api/auth/signOut';
	import { useRouter } from 'vue-router';
	import Separator from './Separator.vue'
	import userStore from '@/store/user';
	import { ref } from 'vue';
	import session from '@/store/session'
	import search from '@/store/search';

	const dropDown = ref<Node>();
	const isOpen = ref(false);
	const router = useRouter();

	const stopPropagation = (event: Event) => event.stopPropagation();

	const userImage = userStore.socialUser?.picture ? new URL(userStore.socialUser.picture).href : '';

	const handleOutsideClick = (event: Event) => {
		if (!(dropDown.value as any as Node).contains(event.target as any as Node)) {
			isOpen.value = false;
			window.removeEventListener('click', handleOutsideClick);
		}
	}
	const handleHome = () => {
		search.deleteStore();
		router.push({path: '/'})
	}
	const toggleOpen = (event: Event) => {
		event.stopPropagation();
		isOpen.value = !isOpen.value;
		if(isOpen) window.addEventListener('click', handleOutsideClick);		
	}

	const handleLogout = async () => {
		await logout();
		userStore.clearStore();
		session.deleteSession();
		window.removeEventListener('click', handleOutsideClick);
		router.push({name: 'SignIn'});
	}
</script>
<style scoped>
	.header-container {
		background: var(--bg);
		width: 100vw;
		height: 5rem;
		position: fixed;
		display: flex;
		align-items: center;
		top: 0;
		left: 0;
		z-index: 100;
	}
	.navigation {
		width: 100%;
		padding: 0 6.25rem 0 6.25rem; 
		margin: 0 auto 0 auto;
		display: flex;
		justify-content: space-between;
		font-size: 1rem;
		font-weight: 700;
		color: white;
	}
	.navigation-options {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2.375rem;
		margin: 0;
	}
	.navigation-options li {
		width: 100%;
	}
	.navigation-options li:last-child {
		position: relative;
		display: flex;
		gap: 1rem;
		align-items: center;
		cursor: pointer;
	}
	.navigation-options a {
		text-decoration: none;
		color: white;
	}
	.navigation-options a:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.user-icon {
		height: 2rem;
	}
	.user-image {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}
	.drop-down {
		position: absolute;
		left: -2.375rem;
		right: 0;
		bottom: -4rem;
		background: white;
		display: flex;
		gap: .5rem;
		width: 200px;
		padding: .8rem;
		box-shadow: 0px 4px 25px rgba(13, 60, 151, 0.5);
		align-items: center;
		cursor: default;
		color: black;
	}
	.drop-down a {
		font-weight: 400;
		color: black;
	}
	.drop-down li:hover {
		text-decoration: underline;
	}
	.logo {
		color: white;
		text-decoration: none;
		font-size: 2rem;
		font-weight: 700;
		cursor: pointer;
	}
</style>