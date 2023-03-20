<template>
  <form class="flex flex-col w-[70%] mx-auto space-y-6" ref="form" @submit="onSubmit($event)">
    <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3">
        <div class="md:col-span-1">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Film</h3>
          <p class="mt-1 text-sm text-gray-500">Ajouter les informations d'un film</p>
        </div>
        <div class="md:col-span-2">
          <div class="mt-5 md:col-span-2">
            <label for="first-name" class="block text-sm font-medium text-gray-700">Titre</label>
            <input type="text" v-model="titre" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div class="mt-5 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Date de sortie</label>
            <div class="mt-1">
              <input v-model="dateSortie" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" type="date" />
            </div>
          </div>
          <div class="mt-5 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Langue</label>
            <input v-model="langue" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div class="mt-5 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Genre</label>
            <select v-model="genre" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option v-for="genre in genres">
                {{ genre.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Réalisateur</h3>
          <p class="mt-1 text-sm text-gray-500">Insérez les informations du réalisateur</p>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Prénom</label>
              <input v-model="prenom" type="text" class="mt-1 block w-full rounded-md border-green-400 shadow-sm" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Nom</label>
              <input v-model="nom" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>

            <div class="col-span-6">
              <label class="block text-sm font-medium text-gray-700">Date de naissance</label>
              <div class="mt-1">
                <input v-model="dateNaissance" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" type="date" />
              </div>
            </div>

            <div class="col-span-6">
              <label class="block text-sm font-medium text-gray-700">Nationalité</label>
              <input v-model="nationalite" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <button type="button" @click="$router.go(-1)" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm">Annuler</button>
      <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm">Enregistrez</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useMovieStore} from "../store/MovieStore";
import {Movie} from "../types/Movie";
import {getPosterByTitle} from "../services/OMdbService";
import router from "../router/Router";
import DateUtils from "../utils/DateUtils";
import {useRoute} from "vue-router";

const genres = [
  { id: 1, name: 'Comédie' },
  { id: 2, name: 'Horreur' },
  { id: 3, name: 'Thriller' },
  { id: 4, name: 'Science-fiction' },
  { id: 5, name: 'Autre' }]

const props = defineProps<{movie?: Movie}>()

const titre = ref('')
const dateSortie = ref('')
const langue = ref('')
const genre = ref('')
const prenom = ref('')
const nom = ref('')
const dateNaissance = ref('')
const nationalite = ref('')
const form = ref()
const idMovie = useRoute().params.id;

if(props.movie) {
  titre.value = props.movie.title
  dateSortie.value = DateUtils.getUnformattedDate(props.movie.release)
  langue.value = props.movie.language
  genre.value = props.movie.genre
  prenom.value = props.movie.director.firstname
  nom.value = props.movie.director.lastname
  dateNaissance.value = DateUtils.getUnformattedDate(props.movie.director.birthday)
  nationalite.value = props.movie.director.nationality
}

const onSubmit = async (event: Event) => {
  event.preventDefault()

  const titlePosterOnApi = async () => {
    let poster;
    await getPosterByTitle(titre.value, dateSortie.value).then(
        value => (poster = value)
    )
    if(poster === undefined){
      return 'https://www.picsum.photos/200/300'
    }else{
      return poster
    }
  }

  if(!props.movie){
    useMovieStore().addMovie({
      id: useMovieStore().getLastId() + 1,
      title: titre.value,
      release: DateUtils.getFormattedDate(dateSortie.value),
      language: langue.value,
      genre: genre.value,
      poster: await titlePosterOnApi(),
      director: {
        id: useMovieStore().getLastId() + 1,
        firstname: prenom.value,
        lastname: nom.value,
        birthday: DateUtils.getFormattedDate(dateNaissance.value),
        nationality: nationalite.value
      }
    })
  }else{
    const movie: Movie = {
      id: props.movie.id,
      title: titre.value,
      release: DateUtils.getFormattedDate(dateSortie.value),
      language: langue.value,
      genre: genre.value,
      poster: await titlePosterOnApi(),
      director: {
        id: props.movie.director.id,
        firstname: prenom.value,
        lastname: nom.value,
        birthday: DateUtils.getFormattedDate(dateNaissance.value),
        nationality: nationalite.value
      }
    }
    useMovieStore().updateMovie(parseInt(idMovie), movie)
  }

  await router.push({name: 'home'})
}
</script>
