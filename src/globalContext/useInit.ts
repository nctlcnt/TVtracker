import axios from 'axios'
import { useRequest } from 'ahooks'
import { Dispatch, useEffect, useState } from 'react'
import { getUserInfo } from '@/apis/mongodbAPI.ts'

export type UserSettingsType = {
    name: string
    preferredRegions: string[]
    userDefinedProviders: string[]
    userDefinedStatus: string[]
    _id: string
}

export type InitDataType = {
    getUserSettings: (userId: string) => void
    gettingUserSettings: boolean
    userSettings: UserSettingsType
    userId: string
    setUserId: Dispatch<string>
    setUserSettings: Dispatch<UserSettingsType>
}

const useInit = (): InitDataType => {
    const [userId, setUserId] = useState('')
    const [userSettings, setUserSettings] = useState<UserSettingsType>({} as UserSettingsType)

    // get user list

    // get user info
    const requestUserInfo = (userId: string) => {
        const url = getUserInfo.replace('{userId}', userId)
        return axios.get(url)
    }
    const { run: getUserSettings, loading: gettingUserSettings } = useRequest(requestUserInfo, {
        manual: true,
        onSuccess: ({ data }) => {
            setUserSettings(data as UserSettingsType)
        },
    })

    useEffect(() => {
        if (userId && !userSettings._id) {
            console.log('getUserSettings')
            getUserSettings(userId)
        }
    }, [userId])

    return {
        getUserSettings,
        gettingUserSettings,
        userSettings,
        userId,
        setUserId,
        setUserSettings,
    }
}
export default useInit
