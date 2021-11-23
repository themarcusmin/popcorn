export interface MovieType {
  id: number,
  genres: GenreType[],
  title?: string,
  original_title?: string,
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

export interface GenreType {
  id: number,
  name: string
}

export interface CastType {
    id: number,
    name: string,
    profile_path: string,
    character: string
}

export interface VideoType {
  site: string,
  key: string,
  name: string,
  type: string
  published_at: string
}

export interface RecommendationType {
  id: number,
  title: string,
  original_title: string,
  poster_path: string,
  release_date: string
}