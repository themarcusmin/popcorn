import axios, { AxiosResponse } from 'axios'
import type { SearchResultType } from '$models/searchresult.interface'

const http = axios.create({
    baseURL: import.meta.env.VITE_TMDB_URL,
    headers: {
      "Content-type": "application/json"
    }
  })

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  multiSearch: async (query: string, page = 1) => http.get('/search/multi', { params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
    include_adult: true,
    page,
    query
  }}).then(responseBody)
}

export const Search = {
  searchKeyword: (query: string): Promise<SearchResultType[]> => requests.multiSearch(query)
}
