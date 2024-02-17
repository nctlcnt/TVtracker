import {getRecordsUrl} from "@/common/apis.ts";
import axios from "axios";
import {useRequest} from "ahooks";
import React, {useEffect} from "react";
import GlobalContext from "@/globalContext/GlobalContext.ts";

const useRequestHooks = ({requestAirtableCb}: { requestAirtableCb?: Function }) => {
    const {tokens, readCookies} = React.useContext(GlobalContext)
    const {airtableToken, airtableBaseId} = tokens

    useEffect(() => {
        if (!airtableToken || !airtableBaseId) {
            readCookies()
        }
    }, []);

    const requestTvRecords = async (databaseName: string) => {
        const requestUrl = getRecordsUrl.replace('{baseId}', airtableBaseId).replace('{tableIdOrName}', databaseName)
        return axios.get(requestUrl, {
                params: {view: 'All'},
                headers: {
                    Authorization: `Bearer ${airtableToken}`
                },
            }
        )
    }

    const {run: getAirtableRecords, loading: gettingAirtableRecords} = useRequest(requestTvRecords, {
        manual: true,
        onSuccess: (data) => {
            requestAirtableCb && requestAirtableCb(data)
        }
    })

    return {getAirtableRecords, gettingAirtableRecords}
}

export default useRequestHooks