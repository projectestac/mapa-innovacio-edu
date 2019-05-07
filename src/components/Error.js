import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReportProblem from '@material-ui/icons/ReportProblem';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Refresh from '@material-ui/icons/Refresh';

function Error({ error, history, refetch }) {
  return (
    <div className="err-msg">
      <Typography >
        <ReportProblem className="err-icon" color="secondary" />
        {error || 'Error desconegut!'}
      </Typography>
      {
        (refetch &&
          <Button
            className='action-btn'
            aria-label="Reintenta"
            onClick={refetch}
            variant='outlined' >
            <Refresh className="left-icon" />
            Reintenta
        </Button>) ||
        (history && history.length > 1 &&
          <Button
            className="action-btn"
            aria-label="Torna"
            variant="outlined"
            onClick={() => history.goBack()} >
            <ArrowBack className="left-icon" />
            Torna
        </Button>)
      }
    </div>
  );
}

export default Error;