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
  media_type: string,
  title?: string, // movie
  original_title?: string, // movie
  name?: string, // tv
  original_name?: string, //tv
  poster_path: string,
  release_date?: string
}