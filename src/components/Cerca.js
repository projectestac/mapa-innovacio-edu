import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function Cerca({ id, query, queryResults, updateMainState }) {

  const goToElement = (tipus, id) => ev => {
    updateMainState({ query: null, intro: null, centre: null, programa: null, [tipus]: id })
  };

  return (
    <section className="seccio cerca">
      <Paper className="paper">
        <h2>Cercant "{query}"</h2>
        <p>Funcionalitat en proves!</p>
        {(queryResults.length === 0 && <p>No s'ha trobat cap element coïncident amb el criteri de cerca!</p>) ||
          // TODO: Paginate results
          <ul>
            {queryResults.map(({ item: { nom, id, tipus } }, n) => (
              <li className="item-found" key={n} onClick={goToElement(tipus, id)}>{`${id} - ${nom}`}</li>
            ))}
          </ul>
        }
        <Button
          className="close-query-btn"
          variant="contained"
          color="primary"
          onClick={() => updateMainState({ query: null })}
        >
          Torna al mapa
        </Button>
      </Paper>
    </section>
  );
}

export default Cerca;