export const tmdbBaseUrl: string = 'https://api.themoviedb.org/3'

export const searchTvShows: string = tmdbBaseUrl + '/search/tv'
export const searchProviders: string = tmdbBaseUrl + '/tv/{series_id}/watch/providers'
export const getTvShowDetails: string = tmdbBaseUrl + '/tv/{series_id}'
export const getSeasonDetails: string = tmdbBaseUrl + '/tv/{series_id}/season/{season_number}'
