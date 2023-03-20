import {Movie} from "../types/Movie";
import { useStorage } from '@vueuse/core';
import {defineStore} from "pinia";
import {createMovie, deleteMovie, getAllMovies, updateMovie} from "../services/ApiService";

export const useMovieStore = defineStore("movieStore", {
    state: () => ({
        movies: useStorage('movies', [] as Movie[])
    }),
    actions: {
        addMovie(movie: Movie) {
            this.movies.push(movie);
            createMovie(movie).then(r => console.log(r));
        },
        getMovies() {
            getAllMovies().then((movies) => {
                useMovieStore().setMovies(movies.data);
            });
        },
        getLastId() {
            if (this.movies.length === 0) {
                return 0;
            }
          return this.movies[this.movies.length - 1].id;
        },
        setMovies(movie: Movie[]) {
            this.movies = [];
            movie.forEach((m) => {
                return this.movies.push({
                    id: m.id,
                    title: m.title,
                    release: m.release,
                    language: m.language,
                    genre: m.genre,
                    poster: m.poster,
                    director: {
                        //@ts-ignore
                        id: m.director_id,
                        //@ts-ignore
                        firstname: m.firstname,
                        //@ts-ignore
                        lastname: m.lastname,
                        //@ts-ignore
                        birthday: m.birthday,
                        //@ts-ignore
                        nationality: m.nationality
                    }
                });
            });
        },
        getMovie(id: number) {
            return this.movies.find((m) => m.id === id);
        },
        removeMovie(movie: Movie) {
            this.movies = this.movies.filter((m) => m.id !== movie.id);
            deleteMovie(movie.id).then(r => console.log(r));
        },
        updateMovie(id: number, movie: Movie) {
            updateMovie(id, movie).then(r => console.log(r));
            this.getMovies();
        },
        searchMovies(search: string) {
            return this.movies.filter((m) => {
                return (
                    m.title.toLowerCase().includes(search) ||
                    m.director.firstname.toLowerCase().includes(search) ||
                    m.director.lastname.toLowerCase().includes(search) ||
                    m.genre.toLowerCase().includes(search) ||
                    m.release.toString().toLowerCase().includes(search)
                );
            }, search);
        }
    }
})
