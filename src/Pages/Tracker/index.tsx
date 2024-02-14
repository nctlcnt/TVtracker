import SearchShows from "@/Pages/Tracker/SearchShows";
import axios from "axios";
import {getRecordsUrl} from "@/common/apis.ts";
import {useRequest} from "ahooks";
import {Button} from "@mui/material";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {SaveAltOutlined} from "@mui/icons-material";
import useGlobalContext from "@/globalContext/useGlobalContext.ts";

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
        Title: string[],
        Created: string // date type,
    },
    createdTime: string
}
export type Records = Array<RecordType>

export default ({setAppOpen}: { setAppOpen: any }) => {
    const requestUrl = getRecordsUrl.replace('{baseId}', document.cookie.match(/airtableBaseId=([^;]+)/)?.[1] || '').replace('{tableIdOrName}', 'show_database')
    const requestTvRecords = async () => {
        return axios.get(requestUrl, {
                params: {view: 'All'},
                headers: {
                    Authorization: `Bearer ${document.cookie.match(/airtableToken=([^;]+)/)?.[1]}`
                },
            }
        )
    }

    const {showData, setShowData} = useGlobalContext()
    const {run: getTvRecords, loading} = useRequest(requestTvRecords, {
        manual: true,
        onSuccess: (data) => {
            setShowData(data.data.records as RecordType)
        }
    })
    return (<>
            <Button onClick={() => setAppOpen(false)}>back</Button>
            <Button onClick={getTvRecords}>getTvRecords</Button>
            <SearchShows/>
            {loading && <p>loading...</p>}
            <DataGrid rows={showData} columns={[
                {
                    field: 'ID', headerName: 'ID', valueGetter: (params) => {
                        return params.row.fields.ID
                    }
                },
                {
                    field: 'Title', headerName: 'Title', valueGetter: (params) => {
                        return params.row.fields.Title
                    }
                },
                {
                    field: 'actions',
                    type: 'actions',
                    getActions: () => [<GridActionsCellItem icon={<SaveAltOutlined/>} label={'save'}/>]
                }
            ]}/>

        </>
    )
}