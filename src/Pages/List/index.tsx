import {getRecordsUrl} from "@/common/apis.ts";
import axios from "axios";
import {useRequest} from "ahooks";
import React from "react";
import {Button} from "@mui/material";
import GlobalContext from "@/globalContext/GlobalContext.ts";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {SaveAltOutlined} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {Records} from "@/common/airtableTypes";

export default () => {
    const {tokens, showData, setShowData} = React.useContext(GlobalContext)
    const {airtableToken, airtableBaseId} = tokens
    console.log(tokens)

    const requestUrl = getRecordsUrl.replace('{baseId}', airtableBaseId).replace('{tableIdOrName}', 'show_database')
    const requestTvRecords = async () => {
        return axios.get(requestUrl, {
                params: {view: 'All'},
                headers: {
                    Authorization: `Bearer ${airtableToken}`
                },
            }
        )
    }

    const {run: getTvRecords, loading} = useRequest(requestTvRecords, {
        manual: true,
        onSuccess: (data) => {
            setShowData(data.data.records as Records)
        }
    })


    const navigate = useNavigate()

    return <div>
        <Link to={'/'}>Go Back</Link>
        {loading && <p>loading...</p>}
        <Button onClick={getTvRecords}>getTvRecords</Button>
        <DataGrid autoHeight={true} rows={showData} columns={[
            {
                field: 'ID', headerName: 'ID', valueGetter: (params) => {
                    return params.row.fields.ID
                }
            },
            {
                field: 'Title', headerName: 'Title',
                renderCell: (params) => {
                    return <Link to={`/show/${params.row.fields.ID}`}>{params.row.fields.Title}</Link>
                }
            },
            {
                field: 'status', headerName: 'Status', valueGetter: (params) => {
                    return params.row.fields.status
                }
            },
            {
                field: 'Progress', headerName: 'Progress', valueGetter: (params) => {
                    return params.row.fields.Progress
                }
            },
            {
                field: 'actions',
                type: 'actions',
                // getActions: (params) => [<GridActionsCellItem
                //     onClick={() => getShowDetails(String(params.row.fields.ID))}
                //     icon={<SaveAltOutlined/>} label={'save'}/>]
                getActions: (params) => [<GridActionsCellItem
                    onClick={() => navigate(`/show/${params.row.fields.ID}`)}
                    icon={<SaveAltOutlined/>} label={'save'}/>]
            }
        ]}/>
    </div>
}