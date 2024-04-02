import React, { useEffect } from 'react'
import { Backdrop, Box, Button, Chip, CircularProgress, Divider, Stack } from '@mui/material'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import ShowListItem from '@/Pages/list/ShowListItem.tsx'
import axios from 'axios'
import { useRequest } from 'ahooks'
import { dbShowsRequest } from '@/apis/mongodbAPI.ts'
import { ShowListItemRecord } from '@/common/types/mongo'
import { useAuthCheck } from '@/common/useAuthCheck.tsx'

export default () => {
    useAuthCheck()

    const { showData, readCookies, setShowData, userId, userSettings } = React.useContext(GlobalContext)
    console.log(userSettings)

    const requestShowList = () =>
        axios.get(dbShowsRequest, {
            params: {
                createdBy: userId,
            },
        })

    const { run: getShowList, loading } = useRequest(requestShowList, {
        manual: true,
        onSuccess: ({ data }) => {
            console.log('getShowList', data)
            setShowData(data as ShowListItemRecord[])
        },
    })

    useEffect(() => {
        readCookies()
        if (!showData.length) {
            getShowList()
        }
    }, [])

    const statusChips = userSettings.userDefinedStatus || []
    const [filterChips, setFilterChips] = React.useState<string[]>(['Watching', 'In List'])

    return (
        <div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box flexDirection={'row'} display={'flex'} my={4} alignItems={'center'}>
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
                <Button
                    onClick={() => {
                        getShowList()
                    }}
                    variant={'text'}
                    sx={{ m: 1 }}
                >
                    refresh
                </Button>
            </Box>
            <Stack spacing={1} direction={'row'}>
                {showData &&
                    showData.length > 0 &&
                    showData
                        .filter((item: ShowListItemRecord) => filterChips.includes(item.status))
                        .map((item: ShowListItemRecord) => {
                            return <ShowListItem key={item._id} show={item} />
                        })}
            </Stack>
        </div>
    )
}
