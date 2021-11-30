import type { GenreType, CastType, VideoType, RecommendationType } from "$models/media.interface";

export interface MovieType {
  id: number,
  genres: GenreType[],
  title?: string,
  original_title?: string,
  media_type: string,
  poster_path: string,
  backdrop_path: string,
  overview: string,
  release_date?: string,
  runtime: number,
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
