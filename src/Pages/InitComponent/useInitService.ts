import React from 'react';
import GlobalContext from '@/globalContext/GlobalContext.ts';
import { TokensType } from '@/common/types';

const useInitService = () => {
  const { tokens, readCookies, setTokens } = React.useContext(GlobalContext);
  const { TMDBToken, airtableToken, airtableBaseId } = tokens;
  const [cookies, setCookies] = React.useState('');

  const saveToCookies = (item: string) => {
    // @ts-ignore
    document.cookie = `${item}=${document.getElementById(`${item}`)?.value || ''}`;
    readCookies();
  };

  const processCookies = () => {
    if(!cookies)return
    const cookieArray = cookies.split(';');
    const cookieObject: { [key: string]: string } = {};
    cookieArray.forEach((cookie) => {
      const [key, value] = cookie.split('=');
      cookieObject[key.trim()] = value;
      document.cookie = `${key.trim()}=${value}`;
    });
    setTokens(cookieObject as TokensType);
  };
  return {
    TMDBToken, airtableToken, airtableBaseId, saveToCookies, processCookies, cookies, setCookies, readCookies,
  };
};
export default useInitService;
