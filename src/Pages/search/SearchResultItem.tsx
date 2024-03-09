import React, { useEffect } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { APIShowListItemType } from '@/common/types/tmdb'
import AdjustIcon from '@mui/icons-material/Adjust'
import AddIcon from '@mui/icons-material/Add'
import { CheckRounded, ManageSearchRounded } from '@mui/icons-material'
import ProviderList from '@/Pages/search/ProviderList.tsx'
import useProvider from '@/Pages/search/useProvider.ts'

export default ({
    resultItem,
    addedShows,
    addShow,
}: {
    resultItem: APIShowListItemType
    addShow: (item: APIShowListItemType) => void
    addedShows: number[]
}) => {
    const { preferredRegions, providerResults, searchStreamProviders } = useProvider()
    const boxRef = React.useRef<HTMLDivElement>(null)
    const [width, setWidth] = React.useState<number | undefined>()
    useEffect(() => {
        setWidth(boxRef.current?.offsetWidth)
    }, [])
    const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)

    useEffect(() => {
        console.log(Object.keys(providerResults))
        if (Object.keys(providerResults).length > 0) {
            setDrawerOpen(true)
        }
    }, [providerResults])
    return (
        <Box
            ref={boxRef}
            sx={{
                backgroundColor: '#333547',
                overflow: 'hidden',
                height: width ? width * 0.45 : '100px',
                position: 'relative',
                my: '2px',
                '.button-container': {
                    transition: 'all 0.3s',
                    opacity: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    height: '64px',
                    width: '64px',
                    marginTop: '-64px',
                    '.MuiIconButton-root': {
                        transition: 'transform 0.3s',
                        position: 'absolute',
                    },
                },
                '&:hover': {
                    '.button-container': {
                        opacity: 1,
                        transform: 'rotate(90deg)',
                        display: 'flex',
                        transition: 'all 0.3s',
                        marginTop: '0',
                        marginRight: '-64px',
                    },
                    '.button-container .MuiIconButton-root': {
                        transform: 'rotate(-90deg)',
                        transition: 'transform 0.3s',
                    },
                },
            }}
            className={'search-result-item'}
        >
            <Box
                sx={{
                    opacity: 0.4,
                    position: 'absolute',
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {resultItem.backdrop_path ? (
                    <img src={`https://image.tmdb.org/t/p/original${resultItem.backdrop_path}`} alt={'cover'} />
                ) : (
                    <Typography variant={'h1'} color={'#dfe0e2'}>
                        {resultItem.original_name || resultItem.name}
                    </Typography>
                )}
            </Box>
            <Box
                pl={3}
                pr={1}
                sx={{
                    height: '100%',
                    width: '95%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    borderLeft: '1px solid #ffffff',
                    position: 'absolute',
                    right: 0,
                }}
            >
                <Box display={'flex'} ml={'-36px'} alignItems={'center'} position={'relative'}>
                    <AdjustIcon sx={{ color: 'white' }} />
                    <Typography color={'#ffffff'} variant={width && width < 600 ? 'h6' : 'h4'}>
                        {resultItem.name}
                    </Typography>
                    <Box className={'button-container'}>
                        <IconButton
                            title={'Add Show'}
                            onClick={() => addShow(resultItem)}
                            disabled={addedShows.includes(resultItem.id)}
                            sx={{ color: 'white', p: 0, ml: 1, top: '20px', left: 0 }}
                        >
                            {addedShows.includes(resultItem.id) ? <CheckRounded color={'success'} /> : <AddIcon />}
                        </IconButton>
                        <IconButton
                            onClick={() => searchStreamProviders(String(resultItem.id))}
                            title={'Search Providers'}
                            sx={{ color: 'white', p: 0, mr: 1, right: '20px', left: 0 }}
                        >
                            <ManageSearchRounded />
                        </IconButton>
                    </Box>
                </Box>
                <Typography color={'#ffffff'} variant={'subtitle2'} mb={2}>
                    {resultItem.first_air_date} - {resultItem.original_name}
                </Typography>

                <Box
                    display={drawerOpen ? 'block' : 'none'}
                    position={'absolute'}
                    left={0}
                    top={0}
                    width={1}
                    height={1}
                    bgcolor={'white'}
                >
                    <ProviderList preferredRegions={preferredRegions} providers={providerResults} />
                </Box>
            </Box>
        </Box>
    )
}
