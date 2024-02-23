import { ShowEntry } from '@/Pages/search/useSearchShowsService.ts'

export type ProgressHistoryEntry = {
    showId: number
    episodeId: number
    episodeSeason: number
    episodeNumber: number
    episodeTitle: string
    watchedAt: string
    runtime: number
    aired: string
    createdBy: string
}
export type ProgressDatabaseRecord = { _id: string } & ProgressHistoryEntry
export type HistoryItemRecord = ProgressDatabaseRecord & { showDetails: ShowEntry[] }

export type ShowEntry = {
    showId: number
    status: string
    showTitle: string
    availableAt: string[]
    watchingAt: string[]
    posterPath: string
    firstAired: string
    originalTitle: string
    createdBy: string
    created: string
}
export type ShowDatabaseRecord = { _id: string } & ShowEntry

export type ShowListItemRecord = {
    latestProgress: ProgressDatabaseRecord[]
} & ShowDatabaseRecord
