import { Backdrop, Box, CircularProgress, Divider, IconButton, Stack, Typography } from '@mui/material'
import { formatDate } from 'date-fns'
import { HighlightOffRounded } from '@mui/icons-material'
import { useAuthCheck } from '@/common/useAuthCheck.tsx'
import useHistory from '@/Pages/landing/useHistory.ts'

const HistoryList = ({ isPreview }: { isPreview?: boolean }) => {
    useAuthCheck()
    const { historyData, deleteRecord, randomHexColorCode, gettingProgress } = useHistory()

    return (
        <Box>
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
                                    {!isPreview && (
                                        <IconButton
                                            sx={{ ml: 1 }}
                                            onClick={() => {
                                                deleteRecord(item._id)
                                            }}
                                        >
                                            <HighlightOffRounded />
                                        </IconButton>
                                    )}
                                </Stack>
                            </Box>
                        )
                    })}
            </Stack>
        </Box>
    )
}
export default HistoryList
