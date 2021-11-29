import axios, { AxiosResponse } from 'axios'
import type { SearchResponseType } from '$models/searchresponse.interface'
import type { MovieType } from '$models/movie.interface';
import type { PersonType } from '$models/person.interface';

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
const responseBody_person = (response: AxiosResponse) => response.data;

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
  }}).then(responseBody_movie),
  getTvByID: async (tv_id: number) => http.get(`/tv/${tv_id}`, { params : {
    api_key,
    language,
    append_to_response: 'credits,videos,recommendations'
  }}).then(responseBody_person),
  getPersonByID: async (person_id: number) => http.get(`/person/${person_id}`, { params: {
    api_key,
    language,
    append_to_response: 'credits,videos,combined_credits'
  }}).then(responseBody_person)
}

export const Search = {
  searchKeyword: (query: string, page = 1): Promise<SearchResponseType> => requests.multiSearch(query, page),
  getMovie: (movieid: number): Promise <MovieType> => requests.getMovieByID(movieid),
  getTv: (tvid: number): Promise <void> => requests.getTvByID(tvid),
  getPerson: (personid: number): Promise <PersonType> => requests.getPersonByID(personid)
}