import React from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { Box, Stack, Typography } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'

export default () => {
    const { historyData } = React.useContext(GlobalContext)
    return (
        <Stack>
            {historyData &&
                historyData.slice(0, 5).map((item, index) => {
                    return (
                        <Box key={index}>
                            <Stack my={1}>
                                <Typography>{item.episodeTitle ? item.episodeTitle : item.episodeNumber}</Typography>
                                <Stack direction={'row'}>
                                    <Box textAlign={'left'} flexGrow={1}>
                                        <Typography variant={'caption'}>{item.showDetails[0]?.showTitle}</Typography>
                                    </Box>
                                    <Typography variant={'caption'}>
                                        {item.watchedAt
                                            ? formatDistanceToNow(new Date(item.watchedAt), { includeSeconds: true })
                                            : 'NA'}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    )
                })}
        </Stack>
    )
}
