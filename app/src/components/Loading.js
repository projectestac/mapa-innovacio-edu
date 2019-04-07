import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

/**
 * Basic 'loading data...' page
 */
function Loading() {
  return (
    <div className='seccio loading-msg'>
      <Typography variant='h6' color='inherit'>S'estan carregant les dades...</Typography>
      <CircularProgress className='progress' />
    </div>
  );
}

export default Loading;
