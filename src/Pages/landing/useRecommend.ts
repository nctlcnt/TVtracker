import { useRequest } from 'ahooks'
import { DISCOVER_TV, GET_TOP_RATED_MOVIES } from '@/apis/tmdbAPI.ts'
import { useEffect, useState } from 'react'
import useAxios from '@/common/tmdbRequest.ts'

export type Movie = {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    name: string
}

export default () => {
    const axios = useAxios()
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([] as any)
    const [recommendedTVs, setRecommendedTVs] = useState<Movie[]>([] as any)

    const { run: getTopRatedMovies } = useRequest(() => axios.get(GET_TOP_RATED_MOVIES), {
        manual: true,
        onSuccess: ({ data }) => {
            console.log(data.results as Movie[])
            setTopRatedMovies(data.results)
        },
    })
    const { run: getRecommendedTV } = useRequest(
        () =>
            axios.get(
                DISCOVER_TV +
                    '?air_date.gte=2023-01-01&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_count.desc'
            ),
        {
            manual: true,
            onSuccess: ({ data }) => {
                console.log(data)
                setRecommendedTVs(data.results)
            },
        }
    )

    useEffect(() => {
        getTopRatedMovies()
        getRecommendedTV()
    }, [])

    return {
        topRatedMovies,
        recommendedTVs,
    }
}
