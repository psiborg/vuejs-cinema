<template>
<div id="movie-list">
    <div v-if="filteredMovies.length">
        <movie-item v-for="movie in filteredMovies"
            v-bind:movie="movie.movie"
            v-bind:sessions="movie.sessions"
            v-bind:day="day"
            v-bind:time="time"
            ></movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">
        {{ noResults }}
    </div>
    <div v-else class="no-results">
        Loading...
    </div>
</div>
</template>

<script>
    import times from '../util/times';
    import genres from '../util/genres';
    import MovieItem from './MovieItem.vue';

    export default {
/*
        data: function() {
            return {
                movies: [{
                    title: 'Kill Bill', genre: genres.CRIME
                }, {
                    title: 'Home Alone', genre: genres.COMEDY
                }, {
                    title: 'Austin Powers', genre: genres.COMEDY
                }]
            };
        },
*/
        props: [ 'genre', 'time', 'movies', 'day' ],
        methods: {
            moviePassesGenreFilter(movie) {
                if (!this.genre.length) {
                    return true;
                }
/*
                else {
                    return this.genre.find(genre => movie.genre === genre);
                }
*/
                else {
                    let movieGenres = movie.movie.Genre.split(', ');
                    let matched = true;
                    this.genre.forEach(genre => {
                        if (movieGenres.indexOf(genre) === -1) {
                            matched = false;
                        }
                    });
                    return matched;
                }
            },
            sessionPassesTimeFilter(session) {
                //return true;
                if (!this.day.isSame(this.$moment(session.time), 'day')) {
                    return false;
                }
                else if (this.time.length === 0 || this.time.length === 2) {
                    return true;
                }
                else if (this.time[0] === times.AFTER_6PM) {
                    return this.$moment(session.time).hour() >= 18; // 6PM
                }
                else // BEFORE
                {
                    return this.$moment(session.time).hour() < 18; // 6PM
                }
            }
        },
        computed: {
            filteredMovies() {
                return this.movies
                    .filter(this.moviePassesGenreFilter)
                    .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
            },
            noResults() {
                //return 'No results.';
                let times = this.time.join(', ');
                let genres = this.genre.join(', ');
                return `No results for ${times} ${times.length && genres.length ? ', ' : '' } ${genres}.`;
            }
        },
        components: {
            MovieItem
        },
        created() {
            console.log(this.$moment);
        }
    }
</script>
