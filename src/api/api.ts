import axios, { AxiosResponse } from 'axios'
import type { SearchResponseType } from '$models/searchresponse.interface'
import type { MovieType } from '$models/movie.interface';

const api_key: string = import.meta.env.VITE_TMDB_API_KEY;
const language = 'en-US';

const http = axios.create({
    baseURL: import.meta.env.VITE_TMDB_URL,
    headers: {
      "Content-type": "application/json"
    }
  })

const responseBody_search = (response: AxiosResponse) => response.data;
const responseBody_movie = (response: AxiosResponse) => response.data;

const requests = {
  multiSearch: async (query: string, page: number) => http.get('/search/multi', { params: {
    api_key,
    language,
    include_adult: false,
    page,
    query
  }}).then(responseBody_search),
  getMovieByID: async (movieid: number) => http.get(`/movie/${movieid}`, { params: {
    api_key,
    language,
    append_to_response: 'credits,videos,recommendations'
  }}).then(responseBody_movie)
}

export const Search = {
  searchKeyword: (query: string, page = 1): Promise<SearchResponseType> => requests.multiSearch(query, page),
  getMovie: (movieid: number): Promise <MovieType> => requests.getMovieByID(movieid)
}