export interface PersonType {
    name: string,
    birthday: string,
    biography: string,
    imdb_id: string,
    profile_path: string,
    combined_credits: {
      cast: PersonCastType[]
    }
}

export interface PersonCastType {
  id: number,
  media_type: string,
  name?: string,
  title?: string,
  release_date?: string,
  first_air_date?: string,
  poster_path: string,
  vote_count: number
}