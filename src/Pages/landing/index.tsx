import { Backdrop, CircularProgress, Typography } from '@mui/material'
import PaperInput from '@/common/Components/PaperInput.tsx'
import React from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { useAuthCheck } from '@/common/useAuthCheck.tsx'

const LandingPage = () => {
    useAuthCheck()

    const { gettingUserSettings, userSettings, setUserId, userId } = React.useContext(GlobalContext)

    return (
        <div>
            <Backdrop open={gettingUserSettings}>
                <CircularProgress />
            </Backdrop>
            {userSettings._id && (
                <div>
                    <Typography variant={'subtitle1'}>Current User: {userSettings.name}</Typography>
                </div>
            )}
            {!userId && (
                <PaperInput
                    onSubmit={(value) => {
                        document.cookie = `userId=${value};max-age=31536000;`
                        setUserId(value as string)
                    }}
                />
            )}
        </div>
    )
}
export default LandingPage
