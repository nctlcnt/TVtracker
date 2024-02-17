import {getRecordsUrl} from "@/common/apis.ts";
import axios from "axios";
import {useRequest} from "ahooks";
import React from "react";
import {Box, Button, Chip, Divider, Stack} from "@mui/material";
import GlobalContext from "@/globalContext/GlobalContext.ts";
import {Link} from "react-router-dom";
import {Records, RecordType} from "@/common/airtableTypes";
import ShowListItem from "@/Pages/List/ShowListItem.tsx";

export default () => {
    const {tokens, showData, setShowData} = React.useContext(GlobalContext)
    const {airtableToken, airtableBaseId} = tokens

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

    const statusChips = ['Watching', 'Watched', 'InList', 'Dropped', 'Paused']
    const [filterChips, setFilterChips] = React.useState<string[]>(['Watching', 'InList',])


    return <div>
        <Link to={'/'}>Go Back</Link>
        {loading && <p>loading...</p>}
        <Box flexDirection={'row'} display={'flex'}>
            <Stack spacing={1} direction={'row'}>
                {
                    statusChips.filter((chip) => !filterChips.includes(chip)).map((chip) => {
                        return <Chip size={'small'} variant={'outlined'} key={chip} label={chip}
                                     onClick={() => setFilterChips([...filterChips, chip])}/>
                    })
                }
            </Stack>
            {!!filterChips.length && !!statusChips.filter((chip) => !filterChips.includes(chip)).length &&
                <Divider orientation={'vertical'} flexItem sx={{mx: 1}}/>}
            <Stack spacing={1} direction={'row'}>
                {/*  filer chips array  */}
                {filterChips.map((chip) => {
                    return <Chip size={'small'} key={chip} label={chip} color={'primary'} onClick={() => {
                        if (filterChips.includes(chip)) {
                            if(filterChips.length === 1) {
                                return
                            }
                            setFilterChips(filterChips.filter((item) => item !== chip))
                        } else {
                            setFilterChips([...filterChips, chip])
                        }
                    }
                    }/>
                })}
            </Stack>
        </Box>

        <Button onClick={getTvRecords} variant={'outlined'} sx={{m:1}}>refresh</Button>

        <Stack spacing={1}>
            {
                showData && showData.length > 0 && showData
                    .filter((item: RecordType) => filterChips.includes(item.fields.status))
                    .map((item: RecordType) => {
                        return <ShowListItem key={item.id} show={item}/>
                    })
            }
        </Stack>

    </div>
}