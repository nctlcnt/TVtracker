import useSettings from '@/Pages/settings/useSettings.ts'
import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Typography } from '@mui/material'
import { UserSettingsType } from '@/globalContext/useInit.ts'
import PaperInput from '@/common/Components/PaperInput.tsx'
import React from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { useAuthCheck } from '@/common/useAuthCheck.tsx'

const Settings = () => {
    useAuthCheck()
    const {
        userSettings,
        setEditingItem,
        removeSettingOption,
        addSettingOption,
        expanded,
        addingItem,
        handleChange,
        editing,
    } = useSettings()
    const { name, preferredRegions, userDefinedProviders, userDefinedStatus } = userSettings as UserSettingsType
    const settingList = {
        preferredRegions,
        userDefinedStatus,
        userDefinedProviders,
    } as { [key: string]: string[] }
    const { tokens, setTokens } = React.useContext(GlobalContext)

    return (
        <div>
            <h1>Settings: {name ? name : 'no user'}</h1>
            <PaperInput
                onSubmit={(value) => {
                    // set cookies
                    document.cookie = `TMDBToken=${value};max-age=31536000;`
                    setTokens({ ...tokens, 'TMDBToken': value as string })
                }}
                placeholder={'TMDB Token'}
            />
            <Typography width={1} sx={{ overflowWrap: 'anywhere' }}>
                {tokens.TMDBToken}
            </Typography>
            {Object.keys(settingList).map((item: string) => {
                return (
                    <Accordion key={item} expanded={expanded === item} onChange={handleChange(item)}>
                        <AccordionSummary>{item}</AccordionSummary>
                        <AccordionDetails>
                            {settingList[item]?.length &&
                                settingList[item].map((subItem, index) => {
                                    return (
                                        <div key={subItem + index}>
                                            {subItem} {addingItem && subItem === addingItem && <CircularProgress />}
                                            <Button
                                                onClick={() =>
                                                    removeSettingOption(item as keyof UserSettingsType)(subItem)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    )
                                })}
                            {editing && editing === item ? (
                                <PaperInput
                                    onSubmit={(value) =>
                                        addSettingOption(item as keyof UserSettingsType)(value as string)
                                    }
                                    placeholder={item}
                                />
                            ) : (
                                <Button onClick={() => setEditingItem(item)}>Add {item}</Button>
                            )}
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    )
}
export default Settings
