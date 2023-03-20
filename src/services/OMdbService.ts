import axios from "axios";

const apiKey = "a1171abb";

export const getPosterByTitle = async (title: string, date: string) => {
    const year = date.split("-")[0];
    const response = await axios.get(
        `https://www.omdbapi.com/?t=${title}&y=${year}&apikey=${apiKey}`
    );
    return response.data.Poster;
}
