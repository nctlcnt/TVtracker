export type EpisodeRecordType = {
    id: string
    fields: {
        ShowTitle: string
        ShowId: number
        EpisodeSeason: number
        EpisodeNumber: number
        EpisodeTitle: string
        WatchedAt: string // date type,
        Aired: string // date type,
        EpisodeId: number
        Runtime: number
    }
    createdTime: string
}
