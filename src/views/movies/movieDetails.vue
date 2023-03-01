<template>
  <h1 class="text-3xl font-bold text-center">
    {{ movie.title }}
  </h1>
  <div class="grid grid-cols-2 mt-4">
    <div class="col-span-1 my-auto">
      <img :src="movie.poster" alt="poster" class="mx-auto">
    </div>
    <div class="col-span-1 mr-12 mt-12">
      <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Information du film</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Vous trouverez toute les informations du film ici</p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <MovieInfo title="Titre" :information="movie.title"/>
            <MovieInfo title="Date de sortie" :information="movie.release"/>
            <MovieInfo title="Langue" :information="movie.language" />
            <MovieInfo title="Genre" :information="movie.genre"/>
            <MovieInfo title="Réalisateur" :information="movie.director.firstName + ' ' + movie.director.lastName"/>
            <MovieInfo title="Date de naissance" :information="movie.director.birthDate"/>
            <MovieInfo title="Nationalité" :information="movie.director.nationality"/>
          </dl>
        </div>
      </div>
      <button @click="removeMovie()" class="text-white font-semibold mt-8 float-right mx-auto leading-6 rounded-md bg-red-600 p-3 ml-4"> Supprimer le film</button>
      <router-link :to="{name: 'movieEdit', params: {id: movie.id }  }">
        <button class="text-white font-semibold mt-8 float-right mx-auto leading-6 rounded-md bg-green-600 p-3"> Editer le film</button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from "../../store/movieStore";
import {useRoute} from "vue-router";
import MovieInfo from "../../components/MovieInfo.vue";
import router from "../../router/router";

const movieStore = useMovieStore();
const movie = movieStore.getMovie(parseInt(useRoute().params.id));

function removeMovie() {
  if (movie !== undefined) {
    movieStore.removeMovie(movie);
    router.push({name: 'home'});
  }
}
</script>
