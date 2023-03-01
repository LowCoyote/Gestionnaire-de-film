import {Director} from "./director";

export interface Movie {
    id: number;
    title: string;
    release: string;
    language: string;
    genre: string;
    poster: string;
    director: Director;
}
