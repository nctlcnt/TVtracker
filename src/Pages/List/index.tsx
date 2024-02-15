import {getRecordsUrl} from "@/common/apis.ts";
import axios from "axios";
import {useRequest} from "ahooks";
import React from "react";
import {Button} from "@mui/material";
import GlobalContext from "@/globalContext/GlobalContext.ts";
import {DataGrid} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
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


    return <div>
        <Link to={'/'}>Go Back</Link>
        {loading && <p>loading...</p>}
        <Button onClick={getTvRecords}>getTvRecords</Button>
        <DataGrid autoHeight={true} rows={showData} columns={[
            {
                field: 'Title', headerName: 'Title',
                renderCell: (params) => {
                    return <Link to={`/show/${params.row.fields.ID}`}>{params.row.fields.Title}</Link>
                }, width: 250
            },
            {
                field: 'status', headerName: 'Status', valueGetter: (params) => {
                    return params.row.fields.status
                }, width: 150,
            },
            {
                field: 'Progress', headerName: 'Progress', valueGetter: (params) => {
                    return params.row.fields.Progress
                }, width: 150,
            },
        ]}/>
    </div>
}