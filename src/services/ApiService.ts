import axios from "axios";
import {Movie} from "../types/Movie";

const url = "http://localhost:3000";

export const getAllMovies = async () => {
    const response = await axios.get(
        url + "/movies"
    );
    return response.data;
}

export const updateMovie = async (id: number, movie: Movie) => {
    const response = await axios.put(
        url + "/movies/" + id,
        {
            director_id: movie.director.id,
            title: movie.title,
            release: movie.release,
            language: movie.language,
            genre: movie.genre,
            poster: movie.poster,
        }
    );
    const response2 = await axios.put(
        url + "/director/" + movie.director.id,
        {
            director_id: movie.director.id,
            firstname: movie.director.firstname,
            lastname: movie.director.lastname,
            birthday: movie.director.birthday,
            nationality: movie.director.nationality
        }
    );
    return [response.data, response2.data];
}

export const deleteMovie = async (id: number) => {
    const response = await axios.delete(
        url + "/movies/" + id
    );
    return response.data;
}

export const createMovie = async (movie: Movie) => {
    const response = await axios.post(
        url + "/movies",
        {
            title: movie.title,
            release: movie.release,
            language: movie.language,
            genre: movie.genre,
            poster: movie.poster,
            director_id: movie.director.id,
            firstname: movie.director.firstname,
            lastname: movie.director.lastname,
            birthday: movie.director.birthday,
            nationality: movie.director.nationality
        }
    );
}
