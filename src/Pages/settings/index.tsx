import useSettings from '@/Pages/settings/useSettings.ts'
import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress } from '@mui/material'
import { UserSettingsType } from '@/globalContext/useInit.ts'
import { Link } from 'react-router-dom'
import PaperInput from '@/common/Components/PaperInput.tsx'

const Settings = () => {
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

    return (
        <div>
            <h1>Settings: {name ? name : 'no user'}</h1>
            <Link to={'/'}>To Landing</Link>
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
