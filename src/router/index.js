import { createRouter, createWebHistory } from 'vue-router';
import LibraryView from '../views/LibraryView.vue';
import YouTubeView from '../views/YouTubeView.vue';
import WishesView from '../views/WishesView.vue';
import EveryNoiseView from '../views/EveryNoiseView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'library',
			component: LibraryView
		},
		{
			path: '/youtube',
			name: 'youtube',
			component: YouTubeView
		},
		{
			path: '/wishes',
			name: 'wishes',
			component: WishesView
		},
		{
			path: '/everynoise',
			name: 'everynoise',
			component: EveryNoiseView
		}
	]
});

export default router;
