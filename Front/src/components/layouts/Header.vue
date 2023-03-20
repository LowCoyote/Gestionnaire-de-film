<template>
  <header>
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex">
        <router-link :to="{name: 'home'}" class="-m-1.5 p-1.5">
          <img class="h-12 w-12" src="@/assets/icon.png" alt="" />
        </router-link>
      </div>
      <h1 class="text-2xl font-bold text-green-600">Gestionnaire de film</h1>
      <div class="flex gap-x-12">
        <router-link :to="{name: 'movieAdd'}">
          <button class="text-white font-semibold leading-6 rounded-md bg-green-600 p-3"> Ajouter un film</button>
        </router-link>
      </div>
    </nav>
  </header>
</template>
