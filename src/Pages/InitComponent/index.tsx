import {
    Button, Divider, IconButton, InputBase, Paper, Stack, TextField,
} from '@mui/material';
import {Link} from 'react-router-dom';
import {ArrowRightRounded} from '@mui/icons-material';
import useInitService from '@/Pages/InitComponent/useInitService.ts';

const InitComponent = function () {
    const {
        saveToCookies, setCookies, cookies, processCookies, TMDBToken, airtableToken, airtableBaseId,
        readCookies,
    } = useInitService();

    return (
        <div>
            <Stack>
                {
                    ['TMDBToken', 'airtableToken', 'airtableBaseId'].map((item) => (
                        <Paper
                            key={item}
                            sx={{
                                p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mb: 2,
                            }}
                        >
                            <InputBase
                                sx={{
                                    ml: 1,
                                    flex: 1,
                                }}
                                placeholder={item}
                                id={item}
                            />
                            <IconButton onClick={() => saveToCookies(item)}>
                                <ArrowRightRounded/>
                            </IconButton>
                        </Paper>
                    ))
                }
            </Stack>

            <Stack>
                <TextField
                    minRows={3}
                    multiline
                    value={cookies}
                    onChange={(event) => setCookies(event.target.value)}
                    id="useSavedCookies"
                />
                <Button onClick={processCookies}>Use Saved Cookies</Button>
            </Stack>
            <Divider/>
            <Button className="mt-3" onClick={readCookies}>Check Token From Cookies</Button>
            <div className="text-left">
                <p style={{overflowWrap: 'anywhere'}}>
                    <span className="font-bold">TMDBToken:</span>
                    {' '}
                    {TMDBToken}
                </p>
                <p style={{overflowWrap: 'anywhere'}}>
                    <span className="font-bold">airtableToken:</span>
                    {airtableToken}
                </p>
                <p style={{overflowWrap: 'anywhere'}}>
                    <span className="font-bold">airtableBaseId:</span>
                    {airtableBaseId}
                </p>
                {
                    TMDBToken && airtableToken && airtableBaseId
                    && (
                        <Stack>
                          <span>
                            <Link to="/tracker">Go to Tracker</Link>
                          </span>
                            <span>
                            <Link to="/list">Go to List</Link>
                        </span>
                            <span>
                            <Link to="/history">Go to History</Link>
                        </span>
                        </Stack>
                    )
                }

                {/* <Button onClick={() => setAppOpen(true)}>open</Button> */}
            </div>
        </div>
    );
};
export default InitComponent;
