import { Link, Navigate } from 'react-router-dom';
import React from 'react';
import SearchShows from '@/Pages/Tracker/SearchShows';
import GlobalContext from '@/globalContext/GlobalContext.ts';

function Tracker() {
  const { tokens } = React.useContext(GlobalContext);
  const { TMDBToken, airtableToken, airtableBaseId } = tokens;
  if (!TMDBToken || !airtableToken || !airtableBaseId) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Link to="/">Go Back</Link>
      <SearchShows />
    </>
  );
}
export default Tracker;
