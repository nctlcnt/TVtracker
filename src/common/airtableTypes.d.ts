export type RecordType = {
    id: string,
    fields: {
        ShowTitle: string,
        ShowId: string[],
        FirstAired: string // date type,
        ID: number,
        AvailableAt: string[],
        status: string,
        LastWatched: string //data type,
        FinishedAt: string // date type,
        ProgressSeason: number,
        ProgressEpisode: number,
        Progress: string,
        Title: string,
        Created: string // date type,
        poster: string,
        overview: string,
    },
    createdTime: string
}
export type Records = Array<RecordType>

export type EpisodeRecordType = {
    id: string,
    fields: {
        ShowTitle: string,
        ShowId: number,
        EpisodeSeason: number,
        EpisodeNumber: number,
        EpisodeTitle: string,
        WatchedAt: string // date type,
        Aired: string // date type,
        EpisodeId: number,
        Runtime: number,
    },
    createdTime: string
}
export type EpisodeRecords = Array<EpisodeRecordType>