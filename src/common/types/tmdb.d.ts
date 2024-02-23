export type SeasonFromTMDB = {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
}

export type APIEpisodeInfoType = {
    air_date: string
    episode_number: number
    id: number
    name: string
    overview: string
    production_code: string
    season_number: number
    still_path: string
    vote_average: number
    vote_count: number
    runtime: number
}

export type APISeasonInfoType = {
    _id: string
    air_date: string
    episodes: Array<APIEpisodeInfoType>
    name: string
    overview: string
    id: number
    poster_path: string
    season_number: number
}

export type APIShowDetailType = {
    adult: boolean
    backdrop_path: string
    id: number
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    first_air_date: string
    name: string
    vote_average: number
    vote_count: number
    seasons: Array<SeasonFromTMDB>
    status: string
    number_of_episodes: number
    number_of_seasons: number
}
export type APIShowListItemType = {
    adult: boolean
    backdrop_path: string
    first_air_date: string
    genre_ids: Array<number>
    id: number
    name: string
    origin_country: Array<string>
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
}
