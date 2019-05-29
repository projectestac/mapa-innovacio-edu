import React from 'react';
import AppContext from '../AppContext';
import ReactMarkdown from 'react-markdown/with-html';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { intro } from '../literals';

const MD_OPTIONS = {
  escapeHtml: false,
};

function Presentacio({ history }) {

  return (
    <AppContext.Consumer>
      {({ data }) => {
        return (
          <section className="seccio presenta">
            <Paper className="paper">
              <ReactMarkdown {...MD_OPTIONS}>
                {intro}
              </ReactMarkdown>
              <Button
                className="close-intro-btn"
                variant="outlined"
                onClick={() => history.push('/programes')}
              >Accés al mapa</Button>
              <div className="hidden">
                { /* Preload icons in a hidden div */
                  data.programes && Array.from(data.programes.values()).map((p, n) => (
                    <img alt="" key={n} src={`logos/${p.simbol}`} />
                  ))
                }
              </div>
            </Paper>
          </section>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Presentacio;