import React, { useEffect } from 'react'
import { Backdrop, Box, Button, CircularProgress, Divider, IconButton, Stack, Typography } from '@mui/material'
import { Link, redirect } from 'react-router-dom'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { formatDate } from 'date-fns'
import axios from 'axios'
import { useRequest } from 'ahooks'
import { HighlightOffRounded } from '@mui/icons-material'
import { deleteHistoryEntry, dbHistoryRequest } from '@/apis/mongodbAPI.ts'
import { HistoryItemRecord } from '@/common/types/mongo'

const HistoryList = () => {
    const { tokens, readCookies, historyData, setHistoryData } = React.useContext(GlobalContext)
    const { TMDBToken } = tokens

    const requestProgressData = () => axios.get(dbHistoryRequest)
    const { run: getProgress, loading: gettingProgress } = useRequest(requestProgressData, {
        manual: true,
        onSuccess: ({ data }) => {
            console.log('getProgress', data)
            setHistoryData(data as HistoryItemRecord[])
        },
    })
    useEffect(() => {
        readCookies()
        if (!TMDBToken) {
            redirect('/')
        }
        if (!historyData?.length) {
            refresh()
        }
    }, [])

    const refresh = () => {
        getProgress()
    }
    const randomHexColorCode = (seed: number) => {
        let randomNumber = seed ? Number('0.' + seed.toString()) : Math.random()
        let n = (randomNumber * 0xfffff * 1000000).toString(16)
        // console.log(n)
        return '#' + n.slice(2, 8)
    }

    const deleteRecordRequest = async (recordId: string) => axios.delete(deleteHistoryEntry.replace('{_id}', recordId))

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
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={gettingProgress}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stack>
                {historyData &&
                    historyData.map((item, index) => {
                        return (
                            <Box key={index}>
                                {formatDate(new Date(item.watchedAt || 0), 'yyyy.MM.dd') !==
                                    formatDate(new Date(historyData[index - 1]?.watchedAt || 0), 'yyyy.MM.dd') && (
                                    <Typography variant={'h6'} textAlign={'left'}>
                                        {formatDate(new Date(item.watchedAt || 0), 'E, MMM dd')}
                                    </Typography>
                                )}
                                <Stack direction={'row'} alignItems={'center'} my={1}>
                                    <Typography variant={'caption'}>
                                        {item.watchedAt ? formatDate(new Date(item.watchedAt), 'HH:mm') : 'NA'}
                                    </Typography>
                                    <Divider
                                        orientation={'vertical'}
                                        flexItem
                                        sx={{
                                            borderColor: randomHexColorCode(item.showId),
                                            borderRightWidth: '2px',
                                            mx: 1,
                                        }}
                                    />
                                    <Box textAlign={'left'} flexGrow={1}>
                                        <Typography variant={'caption'}>{item.showDetails[0]?.showTitle}</Typography>
                                        <Typography>
                                            {item.episodeTitle ? item.episodeTitle : item.episodeNumber}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        sx={{ ml: 1 }}
                                        onClick={() => {
                                            deleteRecord(item._id)
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
