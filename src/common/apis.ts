export const tmdbBaseUrl: string = 'https://api.themoviedb.org/3'
export const airtableBaseUrl: string = 'https://api.airtable.com/v0'

export const searchTvShows: string = tmdbBaseUrl + '/search/tv'
export const searchProviders: string = tmdbBaseUrl + '/tv/{series_id}/watch/providers'

export const getRecordsUrl: string = airtableBaseUrl + '/{baseId}/{tableIdOrName}'
export const createRecordsUrl: string = airtableBaseUrl + '/{baseId}/{tableIdOrName}'
