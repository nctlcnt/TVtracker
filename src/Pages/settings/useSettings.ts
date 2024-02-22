import React, { useContext } from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { UserSettingsType } from '@/globalContext/useInit.ts'
import axios from 'axios'

import { useRequest } from 'ahooks'
import { getUserInfo } from '@/apis/mongodbAPI.ts'

type SettingsDataType = {
    addSettingOption: (settingType: keyof UserSettingsType) => (newItem: string) => void
    expanded: string | false
    handleChange: (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => void
    editing: string | false
    setEditingItem: (settingType: string) => void
    updatingUserSettings: boolean
    addingItem: string | false
    removeSettingOption: (settingType: keyof UserSettingsType) => (item: string) => void
} & { userSettings: UserSettingsType }
const useSettings = (): SettingsDataType => {
    const { userSettings, setUserSettings, userId } = useContext(GlobalContext)
    const [expanded, setExpanded] = React.useState<string | false>('panel1')
    const [editing, setEditing] = React.useState<string | false>(false)
    const [addingItem, setAddingItem] = React.useState<string | false>(false)

    const postUserSettings = (newSettings: { [key: string]: string[] }) =>
        axios.post(getUserInfo.replace('{userId}', userId), newSettings)
    const { run: updateUserSettings, loading: updatingUserSettings } = useRequest(postUserSettings, {
        manual: true,
        onSuccess: ({ data }) => {
            console.log(data as UserSettingsType)
            setAddingItem(false)
        },
    })

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
        setEditing(false)
    }
    const setEditingItem = (settingType: string) => {
        setEditing(settingType)
    }

    const addSettingOption = (settingType: keyof UserSettingsType) => (newItem: string) => {
        if (userSettings[settingType].includes(newItem)) {
            setEditing(false)
            return
        }
        setAddingItem(newItem)
        setUserSettings({ ...userSettings, [settingType]: [...userSettings[settingType], newItem] })
        updateUserSettings({ [settingType]: [...userSettings[settingType], newItem] })
        setEditing(false)
    }

    const removeSettingOption = (settingType: keyof UserSettingsType) => (item: string) => {
        const updatedSettings = {
            [settingType]: (userSettings[settingType] as string[]).filter((i: string) => i !== item),
        }
        console.log(updatedSettings)
        setUserSettings({
            ...userSettings,
            ...updatedSettings,
        })
        updateUserSettings(updatedSettings)
    }

    return {
        userSettings,
        addSettingOption,
        expanded,
        handleChange,
        editing,
        setEditingItem,
        updatingUserSettings,
        addingItem,
        removeSettingOption,
    }
}

export default useSettings
