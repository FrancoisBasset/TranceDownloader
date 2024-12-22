<template>
	<div class="text-center">
		<MenuBar />
		<RouterView />
	</div>
</template>

<script>
import MenuBar from './components/MenuBar.vue';

export default {
	components: {
		MenuBar
	}
};
</script>
