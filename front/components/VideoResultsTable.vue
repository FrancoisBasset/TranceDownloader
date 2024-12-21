<template>
	<div>
		<table role="presentation">
			<tbody>
				<tr v-for="result in results" :key="result" @click="onResultSelected(result)" :style="{ backgroundColor: selectedResult && result.url === selectedResult.url ? 'rgb(60, 80, 190)' : '' }">
					<td>{{ result.title }}</td>
					<img :src="result.image" width="400" height="250" @click="transformToIframe(result, $event)" />
					<td>{{ result.channel }}</td>
					<td>{{ result.views }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
div {
	width: 50%;
	height: 80%;
	background-color: rgb(54, 64, 121);
	overflow: scroll;
}

table {
	overflow: scroll;
	width: 50%;
}
</style>

<script>
export default {
	emits: ['resultSelected'],
	props: ['results'],
	data() {
		return {
			selectedResult: null
		};
	},
	methods: {
		onResultSelected(result) {
			this.selectedResult = result;
			this.$emit('resultSelected', result);
		},
		transformToIframe(result, e) {
			e.target.outerHTML = `<td><iframe src="https://www.youtube.com/embed/${result.url.split('v=')[1]}" width="400" height="250" /></td>`;
		}
	}
};
</script>
