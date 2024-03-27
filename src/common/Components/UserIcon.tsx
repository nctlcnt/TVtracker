import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'

export default () => {
    const { userSettings } = React.useContext(GlobalContext)
    return (
        <Box display={'flex'} alignItems={'center'}>
            <Avatar sx={{ width: 36, height: 36, mr: 2 }} title={userSettings.name} />
            <Typography>{userSettings.name}</Typography>
        </Box>
    )
}
