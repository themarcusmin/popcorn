export interface SearchResultType {
  id: number,
  media_type: string,
  name?: string,
  original_name?: string,
  original_title?: string,
  poster_path?: string,
  title?: string,
  first_air_date?: string,
  release_date?: string,
  origin_country?: string[],
  birthday?: string, // person
  profile_path?: string // person
}