import React, { useState } from 'react'
import { UserSettingsType } from '@/globalContext/useInit.ts'
import axios from 'axios'
import { useRequest } from 'ahooks'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { getUsers } from '@/apis/mongodbAPI.ts'

const useInit = () => {
    const { userId, gettingUserSettings, userSettings, setUserId } = React.useContext(GlobalContext)
    const [userList, setUserList] = useState<UserSettingsType[]>([] as UserSettingsType[])
    const requestUserList = () => axios.get(getUsers)
    const { run: getUserList, loading: gettingUserList } = useRequest(requestUserList, {
        manual: true,
        onSuccess: ({ data }) => {
            setUserList(data as UserSettingsType[])
        },
    })

    return {
        userList,
        setUserList,
        gettingUserList,
        userSettings,
        gettingUserSettings,
        getUserList,
        setUserId,
        userId,
    }
}

export default useInit
