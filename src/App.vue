<script setup lang="ts">
import Header from "./components/layouts/Header.vue";
import { useMovieStore } from "./store/movieStore";

useMovieStore().addMovie({
  id: 1,
  title: "Interstellar",
  release: "5/11/2014",
  language: "Anglais",
  genre: "Science-fiction",
  poster: "https://picsum.photos/200/300",
  director: {
    id: 1,
    firstName: "Christopher",
    lastName: "Nolan",
    birthDate: "1/1/1970",
    nationality: "Anglais",
  },
});

useMovieStore().addMovie({
  id: 2,
  title: "Inception",
  release: "5/11/2010",
  language: "Anglais",
  genre: "Science-fiction",
  poster: "https://picsum.photos/200/300",
  director: {
    id: 1,
    firstName: "Christopher",
    lastName: "Nolan",
    birthDate: "1/1/1970",
    nationality: "Anglais",
  },
})

useMovieStore().addMovie({
  id: 3,
  title: "The Dark Knight",
  release: "5/11/2008",
  language: "Anglais",
  genre: "Action",
  poster: "https://picsum.photos/200/300",
  director: {
    id: 1,
    firstName: "Christopher",
    lastName: "Nolan",
    birthDate: "1/1/1970",
    nationality: "Anglais",
  },
})
</script>

<template>
  <Header/>
  <div class="h-full w-full">
    <router-view />
  </div>
</template>
