import useRequestHooks from "@/common/useRequestHooks.ts";
import React, {useEffect} from "react";
import {Backdrop, Box, Stack, Typography} from "@mui/material";
import {Link, redirect} from "react-router-dom";
import GlobalContext from "@/globalContext/GlobalContext.ts";
import {HistoryItemType} from "@/common/airtableTypes";
import {formatDate} from "date-fns";


const HistoryList = () => {
    const {tokens, readCookies, historyData, setHistoryData} = React.useContext(GlobalContext)
    const {airtableToken, airtableBaseId, TMDBToken} = tokens

    const {
        getAirtableRecords,
        gettingAirtableRecords
    } = useRequestHooks({
        requestAirtableCb: (data: any) => {
            setHistoryData(data.data.records as HistoryItemType[])
            console.log(data.data.records)
        }
    })
    useEffect(() => {
            readCookies()
            if (!airtableToken || !airtableBaseId || !TMDBToken) {
                redirect('/')
            }
            console.log(airtableToken, airtableBaseId, TMDBToken)
            if (!historyData?.length) {
                getAirtableRecords('episode_tracker')
            }
        }, []
    )
    return <Box>
        <Backdrop open={gettingAirtableRecords}/>
        <Link to={'/'}>Go Back</Link>
        <Stack>
            {
                historyData && historyData.map((item) => {
                    return <Box><Typography
                        key={item.id}>{item.fields.EpisodeTitle ? item.fields.EpisodeTitle : item.fields.EpisodeNumber} ({item.fields.ShowTitle})</Typography>
                        <Typography
                            variant={'caption'}>{formatDate(new Date(item.fields.WatchedAt || 0), 'yyyy.MM.dd')}</Typography>
                    </Box>
                })
            }
        </Stack></Box>
}
export default HistoryList