import React from 'react';
import AppContext from '../AppContext';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Error from './Error';
import MapSection from './MapSection';

function FitxaZona({ history, match: { params: { id } } }) {

  return (
    <AppContext.Consumer>
      {({ data, cursos, currentPrograms, polygons, mapChanged, updateMap }) => {
        // Find the specified program
        const zona = data.poligons.get(id);
        if (!zona)
          return <Error {...{ error: `No hi ha cap zona amb el codi: ${id}`, history }} />

        // Els camps id, nomCurt i color no s'utilitzen
        const { nom, tipus, centresInn } = zona;

        const torna = () => history.goBack();
        const obreCentre = id => () => history.push(`/centre/${id}`);

        return (
          <>
            <Button className="torna" aria-label="Torna" onClick={torna} >
              <ArrowBack className="leftIcon" />
              Torna
            </Button>
            <section className="seccio zona">
              <Paper className="paper">
                <h3>{nom}</h3>
                <div>{`Tipus: ${tipus}`}</div>
                <div id="descripcio">
                  <p>... aquí hi anirà l'adreça, la web i altres informacions relacionades amb el ST/SE ...</p>
                </div>
                <h4>Centres d'aquest servei que participen en programes d'innovació:</h4>
                <ul>
                  {Array.from(centresInn).sort((a, b) => a.nom.localeCompare(b.nom)).map(({ id, nom, municipi }, c) => {
                    return (
                      <li key={c} >
                        <Button onClick={obreCentre(id)}>{`${nom} (${municipi})`}</Button>
                      </li>
                    );
                  })}
                </ul>
              </Paper>
            </section>
            <MapSection {...{ data, programa: null, centre: null, cursos, currentPrograms, polygons, mapChanged, history, updateMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaZona;
