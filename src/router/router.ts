import {createRouter, createWebHistory} from "vue-router";

//j'ai mis des ts-ignore car il ne détecte pas le @ mis dans le fichier config de vite
const routes = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'home',
        //@ts-ignore
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/movie/add',
        name: 'movieAdd',
        //@ts-ignore
        component: () => import('@/views/movies/movieAdd.vue')
    },
    {
        path: '/movie/:id',
        name: 'movieDetail',
        //@ts-ignore
        component: () => import('@/views/movies/movieDetails.vue')
    },
    {
        path: '/movie/:id/edit',
        name: 'movieEdit',
        //@ts-ignore
        component: () => import('@/views/movies/movieEdit.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }]
})
export default routes;
