<template>
	<div>
		<WishesTable v-if="wishes" id="wishesDiv" :wishes="wishes" @wishSelected="wish => onWishSelected(wish)" />
		<AddWishForm id="addDiv" @wishAdded="initWishes()" />
		<UpdateWishForm v-if="selectedWish" id="updateDiv" @wishUpdated="initWishes()" :wishes="wishes" :wish="selectedWish" :key="selectedWish" />
	</div>
</template>

<style scoped>
#wishesDiv {
	position: absolute;
	top: 10%;
}

#addDiv {
	position: absolute;
	right: 0;
	top: 10%;
	text-align: center;
}

#updateDiv {
	position: absolute;
	top: 55%;
	right: 0;
	text-align: center;
}
</style>

<script>
import WishesTable from '../components/WishesTable.vue';
import AddWishForm from '../components/AddWishForm.vue';
import UpdateWishForm from '../components/UpdateWishForm.vue';

export default {
	components: {
		WishesTable,
		AddWishForm,
		UpdateWishForm
	},
	data() {
		return {
			wishes: null,
			selectedWish: null
		};
	},
	created() {
		this.initWishes();
	},
	methods: {
		initWishes() {
			fetch('http://localhost:3000/trancedownloader/wishes').then(response => {
				response.json().then(json => {					
					this.wishes = json.response.sort((wish1, wish2) => {
						return wish1.artist.localeCompare(wish2.artist) || wish1.track.localeCompare(wish2.track);
					}).filter(w => !w.done);

					this.selectedWish = this.wishes[0];
				});
			});
		},
		onWishSelected(wish) {
			this.selectedWish = wish;
		}
	}
};
</script>
