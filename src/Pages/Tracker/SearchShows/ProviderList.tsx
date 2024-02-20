import { ProviderRecords, SettingsType } from '@/common/types'
import { Box, Divider, Stack, Typography } from '@mui/material'

const ProviderList = ({ settings, providers }: { settings: SettingsType; providers: ProviderRecords }) => {
    return (
        <div>
            <p>Provider List</p>
            <Box textAlign={'left'}>
                {settings.preferredProviders.map((country) => (
                    <Box>
                        <h3>{country}</h3>
                        {providers[country]?.ads?.length > 0 && (
                            <Box>
                                <Typography variant={'subtitle1'}>Ads</Typography>
                                <ul>
                                    <Stack key={country} direction={'row'}>
                                        {providers[country].ads.map((provider) => (
                                            <img
                                                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                                alt={provider.provider_name}
                                            />
                                        ))}
                                    </Stack>
                                </ul>
                            </Box>
                        )}

                        {providers[country]?.flatrate?.length > 0 && (
                            <Box>
                                <Typography variant={'subtitle1'}>Subscription</Typography>
                                <ul>
                                    <Stack key={country} direction={'row'}>
                                        {providers[country].flatrate.map((provider) => (
                                            <img
                                                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                                alt={provider.provider_name}
                                            />
                                        ))}
                                    </Stack>
                                </ul>
                            </Box>
                        )}
                        {!providers[country]?.flatrate?.length && !providers[country]?.ads?.length && (
                            <Typography variant={'caption'}>No providers found</Typography>
                        )}
                        <Divider />
                    </Box>
                ))}
            </Box>
        </div>
    )
}
export default ProviderList
