import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

/**
 * Basic 'loading data...' page
 */
function Loading({ msg = 'S\'estan carregant les dades...' }) {
  return (
    <div className='err-msg'>
      <Typography>{msg}</Typography>
      <CircularProgress className='progress' />
    </div>
  );
}

export default Loading;
