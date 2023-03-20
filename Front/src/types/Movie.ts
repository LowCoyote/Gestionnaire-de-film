import {Director} from "./Director";

export interface Movie {
    id: number;
    title: string;
    release: string;
    language: string;
    genre: string;
    poster: string;
    director: Director;
}
