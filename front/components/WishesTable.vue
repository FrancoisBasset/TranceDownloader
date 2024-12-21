<template>
	<div>
		<table>
			<caption>
				<h1>Mes envies</h1>
			</caption>
			<thead>
				<tr>
					<th scope="col">Artiste</th>
					<th scope="col">Track</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="wish of wishes" :key="wish" @click="$emit('wishSelected', wish)">
					<td :style="{ backgroundColor: getRandomColor() }">{{ wish.artist }}</td>
					<td :style="{ backgroundColor: getRandomColor() }">{{ wish.track }}</td>
					<td @click="onWishSearch(wish)" :style="{ backgroundColor: getRandomColor(), cursor: 'pointer' }">Rechercher</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
div {
	width: 50%;
	height: 80%;

	overflow: scroll;
	overflow-x: hidden;
}

table {
	margin-left: auto;
	margin-right: auto;
	border-collapse: collapse;
}

td {
	padding: 15px;
}
</style>

<script>
import { getRandomColor } from '../utils';

export default {
	props: ['wishes'],
	emits: ['wishSelected'],
	methods: {
		getRandomColor,
		onWishSearch(wish) {
			localStorage.setItem('search', wish.artist + ' ' + wish.track);
			this.$router.push('/youtube');
		}
	}
};
</script>
