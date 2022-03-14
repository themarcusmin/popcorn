import axios, { AxiosResponse } from 'axios';
import type { SearchResponseType } from '$models/searchresponse.interface';
import type { MovieType } from '$models/movie.interface';
import type { TvType } from '$models/tv.interface';
import type { PersonType } from '$models/person.interface';
import type { TrendingType } from '$models/trending.interface';

const api_key: string = import.meta.env.VITE_TMDB_API_KEY;
const language = 'en-US';

const http = axios.create({
  baseURL: import.meta.env.VITE_TMDB_URL,
  headers: {
    'Content-type': 'application/json'
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  multiSearch: async (query: string, page: number) =>
    http
      .get('/search/multi', {
        params: {
          api_key,
          language,
          include_adult: false,
          page,
          query
        }
      })
      .then(responseBody),
  getMovieByID: async (movie_id: number) =>
    http
      .get(`/movie/${movie_id}`, {
        params: {
          api_key,
          language,
          append_to_response: 'credits,videos,recommendations'
        }
      })
      .then(responseBody),
  getTvByID: async (tv_id: number) =>
    http
      .get(`/tv/${tv_id}`, {
        params: {
          api_key,
          language,
          append_to_response: 'credits,videos,recommendations'
        }
      })
      .then(responseBody),
  getPersonByID: async (person_id: number) =>
    http
      .get(`/person/${person_id}`, {
        params: {
          api_key,
          language,
          append_to_response: 'credits,videos,combined_credits'
        }
      })
      .then(responseBody),
  getTrendingToday: async (media_type: TrendingType) =>
    http
      .get(`/trending/${media_type}/day`, {
        params: {
          api_key
        }
      })
      .then(responseBody),
  getMoviePosterAndTitle: async (movie_id: number) =>
    http
      .get(`/movie/${movie_id}`, {
        params: {
          api_key,
          language
        }
      })
      .then(responseBody),
  getTVPosterAndTitle: async (tv_id: number) =>
    http
      .get(`/tv/${tv_id}`, {
        params: {
          api_key,
          language
        }
      })
      .then(responseBody)
};

export const Search = {
  searchKeyword: (query: string, page = 1): Promise<SearchResponseType> =>
    requests.multiSearch(query, page),
  getMovie: (movieid: number): Promise<MovieType> => requests.getMovieByID(movieid),
  getTv: (tvid: number): Promise<TvType> => requests.getTvByID(tvid),
  getPerson: (personid: number): Promise<PersonType> => requests.getPersonByID(personid),
  getTrending: (media_type: TrendingType): Promise<SearchResponseType> =>
    requests.getTrendingToday(media_type),
  getMoviePosterAndTitle: (movieid: number): Promise<MovieType> =>
    requests.getMoviePosterAndTitle(movieid),
  getTVPosterAndTitle: (tvid: number): Promise<TvType> => requests.getTVPosterAndTitle(tvid)
};
