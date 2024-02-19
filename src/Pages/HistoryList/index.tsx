import useRequestHooks from '@/common/useRequestHooks.ts'
import React, { useEffect } from 'react'
import { Backdrop, Box, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import { Link, redirect } from 'react-router-dom'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { HistoryItemType } from '@/common/airtableTypes'
import { formatDate } from 'date-fns'
import BasicSpeedDial from '@/common/Components/BasicSpeedDial.tsx'

const HistoryList = () => {
    const { tokens, readCookies, historyData, setHistoryData } = React.useContext(GlobalContext)
    const { airtableToken, airtableBaseId, TMDBToken } = tokens

    const { getAirtableRecords, gettingAirtableRecords } = useRequestHooks({
        requestAirtableCb: (data: any) => {
            setHistoryData(data.data.records as HistoryItemType[])
            console.log(data.data.records)
        },
    })
    useEffect(() => {
        readCookies()
        if (!airtableToken || !airtableBaseId || !TMDBToken) {
            redirect('/')
        }
        console.log(airtableToken, airtableBaseId, TMDBToken)
        if (!historyData?.length) {
            refresh()
        }
    }, [])

    const refresh = () => {
        getAirtableRecords('episode_tracker', { sort: [{ field: 'Calculation', direction: 'desc' }], maxRecords: 20 })
    }
    const randomHexColorCode = (seed: number) => {
        let randomNumber = seed ? Number('0.' + seed.toString()) : Math.random()
        let n = (randomNumber * 0xfffff * 1000000).toString(16)
        // console.log(n)
        return '#' + n.slice(2, 8)
    }

    return (
        <Box>
            <Typography variant={'h3'}>History</Typography>

            <Link to={'/'}>Go Back</Link>
            <Divider />
            <Button onClick={refresh}>Refresh</Button>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={gettingAirtableRecords}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stack>
                {historyData &&
                    historyData.map((item, index) => {
                        return (
                            <Box key={index}>
                                {formatDate(new Date(item.fields.WatchedAt || 0), 'yyyy.MM.dd') !==
                                    formatDate(
                                        new Date(historyData[index - 1]?.fields.WatchedAt || 0),
                                        'yyyy.MM.dd'
                                    ) && (
                                    <Typography variant={'h6'} textAlign={'left'}>
                                        {formatDate(new Date(item.fields.WatchedAt || 0), 'E, MMM dd')}
                                    </Typography>
                                )}
                                <Stack direction={'row'} alignItems={'center'} my={1}>
                                    <Typography variant={'caption'}>
                                        {item.fields.WatchedAt
                                            ? formatDate(new Date(item.fields.WatchedAt), 'HH:mm')
                                            : 'NA'}
                                    </Typography>
                                    <Divider
                                        orientation={'vertical'}
                                        flexItem
                                        sx={{
                                            borderColor: randomHexColorCode(item.fields.ShowId),
                                            borderRightWidth: '2px',
                                            mx: 1,
                                        }}
                                    />
                                    <Box textAlign={'left'}>
                                        <Typography variant={'caption'}>{item.fields.ShowTitle}</Typography>
                                        <Typography>
                                            {item.fields.EpisodeTitle
                                                ? item.fields.EpisodeTitle
                                                : item.fields.EpisodeNumber}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        )
                    })}
            </Stack>
            <BasicSpeedDial />
        </Box>
    )
}
export default HistoryList
