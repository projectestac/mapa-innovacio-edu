import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function Cerca({id, query, updateMainState}) {

  return (
    <section className="seccio cerca">
      <Paper className="paper">
        <h2>Cercant "{query}"</h2>
        <p>Funcionalitat encara no implementada.</p>
        <Button
          className="close-query-btn"
          variant="contained"
          color="primary"
          onClick={()=>updateMainState({query: null})}
        >
          Torna al mapa
        </Button>
      </Paper>
    </section>
  );
}

export default Cerca;