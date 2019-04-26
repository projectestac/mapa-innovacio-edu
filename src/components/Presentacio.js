import React from 'react';
import AppContext from '../AppContext';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Presentacio() {

  return (
    <AppContext.Consumer>
      {({ updateMainState }) => {
        return (
          <section className="seccio presenta">
            <Paper className="paper">
              <Typography variant="h4" color="inherit">Presentació</Typography>
              <Typography variant="body2" component="div" align="justify">
                <p>Espai en construcció!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et eleifend diam, sed commodo orci. Sed ut eros faucibus, varius velit eget, euismod quam. Vivamus sed odio erat. Cras ac sem egestas nisi vestibulum ultricies. Sed mattis sem quis sagittis pretium. Nulla vel tortor lacinia, venenatis diam non, vulputate ante. Aenean sed nibh eget erat varius aliquet. Sed in condimentum ex, vel elementum ipsum. Morbi rutrum felis sit amet iaculis maximus. Nulla laoreet ante vel lacinia feugiat. Mauris suscipit interdum tellus vitae ultrices. Pellentesque ligula sem, sodales et consequat ut, interdum ut tellus. In laoreet aliquam luctus. Vestibulum at diam ut diam ornare mollis.</p>
              </Typography>
              <Button
                className="close-intro-btn"
                variant="contained"
                color="primary"
                onClick={() => updateMainState({ intro: false })}
              >Ves al mapa</Button>
            </Paper>
          </section>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Presentacio;