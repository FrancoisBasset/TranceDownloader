<template>
	<div>
		<audio :src="url" controls />
	</div>
</template>

<style scoped>
div {
	width: 50%;
	height: 30%;
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
export default {
	props: [
		'url'
	]
};
</script>
