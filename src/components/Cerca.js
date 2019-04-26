import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const ITEMS_PER_PAGE = process.env.REACT_ITEMS_PER_PAGE || 25;

function Cerca({ id, query, queryResults, updateMainState }) {

  const [page, setPage] = React.useState(0);
  const numPages = Math.ceil(queryResults.length / ITEMS_PER_PAGE);

  const pageLinks = () => {
    const result = [];
    for (let n = 0; n < numPages; n++) {
      result.push(
        page === n
          ? <span key={n} className="page-num"><strong>{n+1}</strong></span>
          : <span key={n} className="page-num page-link" onClick={ev => setPage(n)}>{n+1}</span>
      );
    }
    return result;
  }

  const goToElement = (tipus, id) => ev => {
    updateMainState({ query: null, intro: null, centre: null, programa: null, [tipus]: id })
  };


  return (
    <section className="seccio cerca">
      <Paper className="paper">
        <h2>Resultats de la cerca "{query}"</h2>
        {(queryResults.length === 0 && <p>No s'ha trobat cap element coïncident amb el criteri de cerca!</p>) ||
          // TODO: Paginate results
          <ul>
            {queryResults.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE).map(({ item: { nom, id, tipus } }, n) => (
              <li className="item-found" key={n} onClick={goToElement(tipus, id)} role="button">{nom}</li>
            ))}
          </ul>
        }
        <hr />
        {(numPages > 1) &&
          <div className="search-page-selector">
            Pàgina: {pageLinks()}
          </div>
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