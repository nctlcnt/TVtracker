import React, { useEffect } from 'react'
import { Backdrop, Box, Button, Chip, CircularProgress, Divider, Stack } from '@mui/material'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { Link, redirect } from 'react-router-dom'
import { Records, RecordType } from '@/common/airtableTypes'
import ShowListItem from '@/Pages/List/ShowListItem.tsx'
import useRequestHooks from '@/common/useRequestHooks.ts'

export default () => {
    const { tokens, showData, readCookies, setShowData } = React.useContext(GlobalContext)
    const { airtableToken, airtableBaseId, TMDBToken } = tokens
    const { getAirtableRecords, gettingAirtableRecords } = useRequestHooks({
        requestAirtableCb: (data: any) => {
            setShowData(data.data.records as Records)
        },
    })

    useEffect(() => {
        readCookies()
        if (!airtableToken || !airtableBaseId || !TMDBToken) {
            redirect('/')
        }
        if (!showData.length) {
            getAirtableRecords('show_database')
        }
    }, [])

    const statusChips = ['Watching', 'Watched', 'InList', 'Dropped', 'Paused']
    const [filterChips, setFilterChips] = React.useState<string[]>(['Watching', 'InList'])

    return (
        <div>
            <Link to={'/'}>Go Back</Link>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={gettingAirtableRecords}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box flexDirection={'row'} display={'flex'}>
                <Stack spacing={1} direction={'row'}>
                    {statusChips
                        .filter((chip) => !filterChips.includes(chip))
                        .map((chip) => {
                            return (
                                <Chip
                                    size={'small'}
                                    variant={'outlined'}
                                    key={chip}
                                    label={chip}
                                    onClick={() => setFilterChips([...filterChips, chip])}
                                />
                            )
                        })}
                </Stack>
                {!!filterChips.length && !!statusChips.filter((chip) => !filterChips.includes(chip)).length && (
                    <Divider orientation={'vertical'} flexItem sx={{ mx: 1 }} />
                )}
                <Stack spacing={1} direction={'row'}>
                    {/*  filer chips array  */}
                    {filterChips.map((chip) => {
                        return (
                            <Chip
                                size={'small'}
                                key={chip}
                                label={chip}
                                color={'primary'}
                                onClick={() => {
                                    if (filterChips.includes(chip)) {
                                        if (filterChips.length === 1) {
                                            return
                                        }
                                        setFilterChips(filterChips.filter((item) => item !== chip))
                                    } else {
                                        setFilterChips([...filterChips, chip])
                                    }
                                }}
                            />
                        )
                    })}
                </Stack>
            </Box>
            <Button
                onClick={() => {
                    getAirtableRecords('show_database')
                }}
                variant={'outlined'}
                sx={{ m: 1 }}
            >
                refresh
            </Button>
            <Stack spacing={1}>
                {showData &&
                    showData.length > 0 &&
                    showData
                        .filter((item: RecordType) => filterChips.includes(item.fields.status))
                        .map((item: RecordType) => {
                            return <ShowListItem key={item.id} show={item} />
                        })}
            </Stack>
        </div>
    )
}
