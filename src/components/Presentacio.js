import React from 'react';
import AppContext from '../AppContext';
import ReactMarkdown from 'react-markdown/with-html';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { intro } from '../literals';

const MD_OPTIONS = {
  escapeHtml: false,
};

function Presentacio({ history }) {

  return (
    <AppContext.Consumer>
      {() => {
        return (
          <section className="seccio presenta">
            <Paper className="paper">
              <Typography variant="h4" color="inherit">Presentació</Typography>
              <ReactMarkdown {...MD_OPTIONS}>
                {intro}
              </ReactMarkdown>
              <Button
                className="close-intro-btn"
                variant="outlined"
                onClick={() => history.push('/programes')}
              >Ves al mapa</Button>
            </Paper>
          </section>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Presentacio;