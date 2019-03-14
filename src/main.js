/*
let msg = 'Hello';
let obj = {
	msg
};
console.log(obj);

import './style.scss';

console.log('Hello World');
*/
import Vue from 'vue';
import './style.scss';

//import genres from './util/genres';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

new Vue({
	el: '#app',
/*
	data: {
		msg: 'Hello World'
	},
*/
	data: {
		genre: [],
		time: [],
		movies: []
	},
	methods: {
		checkFilter(category, title, checked) {
			console.log(category, title, checked);
			if (checked) {
				this[category].push(title);
			}
			else {
				let index = this[category].indexOf(title);
				if (index > -1) {
					this[category].splice(index, 1); // remove item from array
				}
			}
		}
	},
	components: {
		MovieList,
		MovieFilter
	},
	created() {
		//console.log(this.$http);
		this.$http.get('/api').then(response => {
			console.log(response.data);
			this.movies = response.data;
		});
	}
});
