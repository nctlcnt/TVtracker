import useRequestHooks from '@/common/useRequestHooks.ts'
import React, { useEffect } from 'react'
import { Backdrop, Box, Button, CircularProgress, Divider, IconButton, Stack, Typography } from '@mui/material'
import { Link, redirect } from 'react-router-dom'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { HistoryItemType } from '@/common/airtableTypes'
import { formatDate } from 'date-fns'
import axios from 'axios'
import { useRequest } from 'ahooks'
import { HighlightOffRounded } from '@mui/icons-material'

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

    const deleteRecordRequest = async (recordId: string) => {
        const requestUrl = `https://api.airtable.com/v0/${airtableBaseId}/episode_tracker`
        return axios.delete(requestUrl, {
            params: {
                records: [recordId],
            },
            headers: {
                Authorization: `Bearer ${airtableToken}`,
            },
        })
    }

    const { run: deleteRecord } = useRequest(deleteRecordRequest, {
        manual: true,
        onSuccess: (data) => {
            console.log('deleteRecord', data)
            refresh()
        },
    })

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
                                    <IconButton
                                        sx={{ ml: 1 }}
                                        onClick={() => {
                                            deleteRecord(item.id)
                                        }}
                                    >
                                        <HighlightOffRounded />
                                    </IconButton>
                                </Stack>
                            </Box>
                        )
                    })}
            </Stack>
        </Box>
    )
}
export default HistoryList
