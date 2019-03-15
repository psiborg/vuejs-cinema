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

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', {
	get() {
		return this.$root.moment;
	}
}); // $ = public API convention

import { checkFilter } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {
	get() {
		return this.$root.bus;
	}
});

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
		movies: [],
		moment,
		day: moment(),
		bus
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
		this.$bus.$on('check-filter', checkFilter.bind(this));
	}
});
