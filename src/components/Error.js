import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function Error({ error, refetch }) {

  return (
    <div classname="err-msg">
      <Grid container direction='column' justify='center' alignItems='center'>
        <h3>{error || 'Error desconegut!'}</h3>
        <Button
          className='action-btn'
          onClick={refetch}
          variant='contained'
          color='primary'
        >Reintenta</Button>
      </Grid>
    </div>
  );

}

export default Error;