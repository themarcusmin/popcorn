import type { GenreType, CastType, VideoType, RecommendationType } from "$models/media.interface";

export interface TvType {
  id: number,
  genres: GenreType[],
  name?: string,
  original_name?: string,
  poster_path: string,
  backdrop_path: string,
  overview: string,
  first_air_date?: string,
  last_air_date?: string,
  number_of_seasons: number,
  vote_average: number,
  vote_count: number
  credits: {
    cast: CastType[]
  },
  videos: {
    results: VideoType[]
  },
  recommendations: {
    results: RecommendationType[]
  }
}
