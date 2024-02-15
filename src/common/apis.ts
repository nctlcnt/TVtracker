export const tmdbBaseUrl: string = 'https://api.themoviedb.org/3'
export const airtableBaseUrl: string = 'https://api.airtable.com/v0'

export const searchTvShows: string = tmdbBaseUrl + '/search/tv'
export const searchProviders: string = tmdbBaseUrl + '/tv/{series_id}/watch/providers'
export const getTvShowDetails: string = tmdbBaseUrl + '/tv/{series_id}'
export const getSeasonDetails: string = tmdbBaseUrl + '/tv/{series_id}/season/{season_number}'

export const getRecordsUrl: string = airtableBaseUrl + '/{baseId}/{tableIdOrName}'
export const createRecordsUrl: string = airtableBaseUrl + '/{baseId}/{tableIdOrName}'
