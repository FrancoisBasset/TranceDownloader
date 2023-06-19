<template>
	<MenuBar id="menu-bar" />
	<RouterView />
</template>

<style scoped>
#menu-bar {
	height: 10%;
}
</style>

<script>
import MenuBar from './components/MenuBar.vue';

export default {
	components: {
		MenuBar
	}
};
</script>
