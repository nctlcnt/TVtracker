import useInit from '@/Pages/landing/useInit.ts'
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material'
import { CheckRounded } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    const { userList, userId, gettingUserList, userSettings, gettingUserSettings, setUserId, getUserList } = useInit()

    return (
        <div>
            <Backdrop open={gettingUserList || gettingUserSettings}>
                <CircularProgress />
            </Backdrop>
            {userSettings._id && (
                <div>
                    <Typography variant={'subtitle1'}>Current User: {userSettings.name}</Typography>
                    <Link to={'/settings'}>To Settings</Link>
                    <Link to={'/tracker'}>To Tracker</Link>
                    <Link to={'/list'}>To List</Link>
                    <Link to={'/history'}>To History</Link>
                </div>
            )}
            {!userSettings._id && (
                <Button onClick={getUserList} disabled={gettingUserList || gettingUserSettings}>
                    Get User List
                </Button>
            )}
            {userList.length > 0 &&
                userList.map((item) => {
                    return (
                        <div key={item._id}>
                            {item.name}{' '}
                            {item._id !== userId ? (
                                <Button onClick={() => setUserId(item._id)}>select</Button>
                            ) : (
                                <CheckRounded color={'success'} />
                            )}
                        </div>
                    )
                })}
        </div>
    )
}
export default LandingPage
