<template>
<div id="movie-filter">
    <h2>Filter Results</h2>
    <h3>By time of day</h3>
    <div class="filter-group">
        <check-filter v-for="time in times" category="time" v-bind:title="time"></check-filter>
    </div>
    <h3>By genre</h3>
    <div class="filter-group">
        <check-filter v-for="genre in genres" category="genre" v-bind:title="genre"></check-filter>
    </div>
</div>
</template>

<script>
    import times from '../util/times';
    import genres from '../util/genres';
    import CheckFilter from './CheckFilter.vue';

    export default {
        data: function() {
            return {
                genres,
                times
            };
        },
        components: {
            CheckFilter
        }
    }
</script>
