export const TMDBBaseUrl: string = 'https://api.themoviedb.org/3'

export const searchTvShows: string = TMDBBaseUrl + '/search/tv'
export const searchProviders: string = TMDBBaseUrl + '/tv/{series_id}/watch/providers'
export const getTvShowDetails: string = TMDBBaseUrl + '/tv/{series_id}'
export const getSeasonDetails: string = TMDBBaseUrl + '/tv/{series_id}/season/{season_number}'
