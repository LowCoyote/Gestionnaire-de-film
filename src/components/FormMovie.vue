<template>
  <form class="flex flex-col w-[70%] mx-auto space-y-6" ref="form" @submit="onSubmit">
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
          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label for="Poster" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Poster</label>
            <div class="mt-1 sm:col-span-2 sm:mt-0">
              <div class="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div v-if="!file" class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-green-600">
                      <span>Envoyer un fichier</span>
                      <input id="file-upload" name="file-upload" @dragover="onFileChanged($event)" @change="onFileChanged($event)" type="file" class="sr-only" />
                    </label>
                    <p class="pl-1">ou drag and drop</p>
                  </div>
                </div>
                <div v-else>
                  <div class="cursor-pointer float-right" @click="fileReset()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <img :src="url" class="w-32 h-32"  alt="Uploaded image"/>
                </div>
              </div>
            </div>
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
      <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm">Annuler</button>
      <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm">Enregistrez</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useMovieStore} from "../store/movieStore";
import {Movie} from "../types/movie";

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
const file = ref<File | null>();
const url: any = ref(null);

if(props.movie) {
  titre.value = props.movie.title
  dateSortie.value = props.movie.release
  langue.value = props.movie.language
  genre.value = props.movie.genre
  prenom.value = props.movie.director.firstName
  nom.value = props.movie.director.lastName
  dateNaissance.value = props.movie.director.birthDate
  nationalite.value = props.movie.director.nationality
}

const onSubmit = () => {
  form.value.reset()
  if(!props.movie){
    useMovieStore().addMovie({
      id: useMovieStore().getLastId() + 1,
      title: titre.value,
      release: dateSortie.value,
      language: langue.value,
      genre: genre.value,
      poster: "https://picsum.photos/200/300",
      director: {
        id: useMovieStore().getLastId() + 1,
        firstName: prenom.value,
        lastName: nom.value,
        birthDate: dateNaissance.value,
        nationality: nationalite.value
      }
    })

    if(file.value) {

    }
  }else{
    // useMovieStore().updateMovie()
  }

}

function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    file.value = target.files[0];
    url.value = URL.createObjectURL(target.files[0]);
  }
}

function fileReset() {
  file.value = null;
}
</script>
