import {Movie} from "../types/movie";
import {defineStore} from "pinia";

export const useMovieStore = defineStore("movieStore", {
    state: () => ({
        movies: [] as Movie[]
    }),
    actions: {
        addMovie(movie: Movie) {
            this.movies.push(movie);
        },
        getLastId() {
          return this.movies[this.movies.length - 1].id;
        },
        getMovie(id: number) {
            return this.movies.find((m) => m.id === id);
        },
        removeMovie(movie: Movie) {
            this.movies = this.movies.filter((m) => m.id !== movie.id);
        },
        updateMovie(movie: Movie) {
            this.movies = this.movies.map((m) => {
                if (m.id === movie.id) {
                    return movie;
                }
                return m;
            });
        },
        searchMovies(search: string) {
            return this.movies.filter((m) => {
                return (
                    m.title.toLowerCase().includes(search) ||
                    m.director.firstName.toLowerCase().includes(search) ||
                    m.director.lastName.toLowerCase().includes(search) ||
                    m.genre.toLowerCase().includes(search) ||
                    m.release.toString().toLowerCase().includes(search)
                );
            }, search);
        }
    }
})
