import React, { useEffect } from 'react'
import { Backdrop, Box, Button, Chip, CircularProgress, Divider, Stack } from '@mui/material'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { Link, useNavigate } from 'react-router-dom'
import ShowListItem from '@/Pages/List/ShowListItem.tsx'
import axios from 'axios'
import { useRequest } from 'ahooks'
import { ShowType } from '@/Pages/search/SearchShows/useSearchShowsService.ts'
import { getShows } from '@/apis/mongodbAPI.ts'

export default () => {
    const { tokens, showData, readCookies, setShowData, userId, userSettings } = React.useContext(GlobalContext)
    const { TMDBToken } = tokens
    console.log(userSettings)

    const requestShowList = () =>
        axios.get(getShows, {
            params: {
                createdBy: userId,
            },
        })

    const { run: getShowList, loading } = useRequest(requestShowList, {
        manual: true,
        onSuccess: ({ data }) => {
            console.log('getShowList', data)
            setShowData(data as ShowType[])
        },
    })

    useEffect(() => {
        readCookies()
        if (!showData.length) {
            getShowList()
        }
    }, [])

    const statusChips = userSettings.userDefinedStatus
    const [filterChips, setFilterChips] = React.useState<string[]>(['Watching', 'In List'])
    const navigate = useNavigate()

    if (!TMDBToken || !userSettings._id) {
        navigate('/')
        return
    }

    return (
        <div>
            <Link to={'/'}>Go Back</Link>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
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
                    getShowList()
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
                        .filter((item: ShowType) => filterChips.includes(item.status))
                        .map((item: ShowType) => {
                            return <ShowListItem key={item._id} show={item} />
                        })}
            </Stack>
        </div>
    )
}
