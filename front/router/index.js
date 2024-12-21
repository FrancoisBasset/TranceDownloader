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
			component: LibraryView,
			meta: {
				title: 'Library'
			}
		},
		{
			path: '/youtube',
			name: 'youtube',
			component: YouTubeView,
			meta: {
				title: 'YouTube'
			}
		},
		{
			path: '/wishes',
			name: 'wishes',
			component: WishesView,
			meta: {
				title: 'Mes envies'
			}
		},
		{
			path: '/everynoise',
			name: 'everynoise',
			component: EveryNoiseView,
			meta: {
				title: 'EveryNoise'
			}
		}
	]
});

router.beforeEach(to => {
	const link = document.querySelector('link[rel~="icon"]');
	link.href = '/' + to.name + '.ico';
	document.title = to.meta.title;
});

export default router;
