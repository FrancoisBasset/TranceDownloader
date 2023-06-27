<template>
	<div>
		<audio :src="library.url ? 'http://localhost:3000' + library.url : ''" controls autoplay />
	</div>
</template>

<style scoped>
div {
	height: 10%;
	background-color: rgb(92, 56, 113);
	text-align: center;
}

audio {
	position: absolute;
	left: 10%;
	right: 10%;
	top: 40%;
	bottom: 40%;
	width: 80%;
}
</style>

<script>
import useLibraryStore from '../stores/Library';

export default {
	data() {
		return {
			library: useLibraryStore()
		};
	}
};
</script>
