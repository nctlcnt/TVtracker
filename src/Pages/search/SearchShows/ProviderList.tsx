import { ProviderRecords } from '@/common/types'
import { Box, Divider, Stack, Typography } from '@mui/material'

const ProviderList = ({ preferredRegions, providers }: { preferredRegions: string[]; providers: ProviderRecords }) => {
    return (
        <Box>
            <p>Provider List</p>
            {preferredRegions?.map((country) => (
                <Box key={country}>
                    <h3>{country}</h3>
                    {providers[country]?.ads?.length > 0 && (
                        <>
                            <Typography variant={'subtitle1'}>Ads</Typography>
                            <Stack key={country} direction={'row'}>
                                {providers[country].ads.map((provider) => (
                                    <img
                                        key={provider.provider_id}
                                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                        alt={provider.provider_name}
                                    />
                                ))}
                            </Stack>
                        </>
                    )}

                    {providers[country]?.flatrate?.length > 0 && (
                        <Box>
                            <Typography variant={'subtitle1'}>Subscription</Typography>
                            <Stack key={country} direction={'row'}>
                                {providers[country].flatrate.map((provider) => (
                                    <img
                                        key={provider.provider_id}
                                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                        alt={provider.provider_name}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    )}
                    {!providers[country]?.flatrate?.length && !providers[country]?.ads?.length && (
                        <Typography variant={'caption'}>No providers found</Typography>
                    )}
                    <Divider />
                </Box>
            ))}
        </Box>
    )
}
export default ProviderList
