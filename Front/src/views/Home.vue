<template>
  <div class="flex flex-col mx-auto mt-4 w-1/2">
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      <input v-model="search" @input="searchMovie" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200" placeholder="Recherchez un film par réalisateur, année de sortie..." required>
    </div>
  </div>
  <div class="flex row-span-3 mx-auto h-auto">
    <div v-for="movie in searchMovie()" :key="movie.id">
      <MovieCard class="w-fit" :title="movie.title" :image="movie.poster" :director-name="movie.director.firstname + ' ' + movie.director.lastname" :id="movie.id" />
    </div>
  </div>

</template>

<script setup lang="ts">
import MovieCard from "../components/MovieCard.vue";
import {useMovieStore} from "../store/MovieStore";
import {computed, ref} from "vue";
import {getAllMovies} from "../services/ApiService";

const movieStore = useMovieStore();
const search = ref("");
computed(() => movieStore.getMovies());

function searchMovie() {
    return movieStore.searchMovies(search.value);
};
</script>
