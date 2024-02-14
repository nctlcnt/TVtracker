import axios from 'axios';
import {useRequest} from "ahooks";
import {searchTvShows} from "@/common/apis.ts";
import {useState} from "react";

type ResultType = {
    adult: boolean,
    backdrop_path: string,
    id: number,
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    first_air_date: string,
    name: string,
    vote_average: number,
    vote_count: number
}[]
export default () => {
    const [result, setResult] = useState<ResultType>([] as ResultType)

    const getTvShows = (queryString: string) => {
        return axios.get(searchTvShows, {
            params: {
                query: queryString,
                language: 'zh-CN',
            },
            headers: {
                Authorization: `Bearer ${document.cookie.match(/TMDBToken=([^;]+)/)?.[1]}`
            }
        })
    }
    const {run: searchTvShow, loading} = useRequest(getTvShows, {
        manual: true,
        onSuccess: (result) => {
            console.log('result', result.data.results)
            setResult(result.data.results)
        }
    })

    const search = () => {
        const searchString = document.getElementById('searchString') as HTMLInputElement
        searchTvShow(searchString.value)
    }
    return (
        <div>
            <input className={'border-2'} id={'searchString'}/>
            <button onClick={search}>Search</button>
            {loading && <p>loading...</p>}
            {result.map((item: any) => {
                return <div key={item.id}>
                    <p>{item.name}</p>
                    <p>{item.overview}</p>
                </div>
                })
            }
        </div>
    )
}