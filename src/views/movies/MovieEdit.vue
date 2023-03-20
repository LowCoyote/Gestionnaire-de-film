<template>
  <form-movie :movie="movie"/>
</template>

<script setup lang="ts">
import {useMovieStore} from "../../store/MovieStore";
import {useRoute} from "vue-router";
import FormMovie from "../../components/FormMovie.vue";

const movie = useMovieStore().getMovie(parseInt(useRoute().params.id))
</script>
