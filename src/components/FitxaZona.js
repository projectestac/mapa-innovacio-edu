import React from 'react';
import AppContext from '../AppContext';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Error from './Error';
import MapSection from './MapSection';
import Utils from '../utils/Utils';

function FitxaZona({ history, match: { params: { key } } }) {

  return (
    <AppContext.Consumer>
      {({ data, cursos, currentPrograms, polygons, mapChanged, updateMap }) => {
        // Find the specified program
        const zona = data.poligons.get(key);
        if (!zona)
          return <Error {...{ error: `No hi ha cap zona amb el codi: ${key}`, history }} />

        // Els camps id, nomCurt i color no s'utilitzen
        const { tipus, nom, logo, cp, adreca, municipi, comarca, tel, fax, correu, web, centresInn } = zona;

        const torna = () => history.goBack();
        const obreCentre = codi => () => history.push(`/centre/${codi}`);
        const obrePrograma = id => () => history.push(`/programa/${id}`);

        return (
          <>
            <Button className="torna" aria-label="Torna" onClick={torna} >
              <ArrowBack className="left-icon" />
              Torna
            </Button>
            <section className="seccio zona">
              <Paper className="paper">
                {logo && <><br clear="all" /><img className={tipus==='ST' ? 'cent-logo' : 'se-logo'} src={logo} alt={nom}></img></>}
                <h3>{nom}</h3>
                <br clear="all" />
                <div id="adreca">
                  <p>
                    {adreca}<br />
                    {`${cp} ${municipi} (${comarca})`}<br />
                    {tel && <>{`Tel. ${tel}`}<br /></>}
                    {fax && <>{`Fax. ${fax}`}<br /></>}
                    {correu && <><a href={`mailto:${correu}`}>{correu}</a><br /></>}
                  </p>
                </div>
                {web && (
                  <div id="link">
                    <h4>Portal web:</h4>
                    <a href={web} target="_blank" rel="noopener noreferrer">{web}</a>
                  </div>)}
                <h4>Centres d'aquest servei que participen en programes d'innovació:</h4>
                <List >
                  {Array.from(centresInn).sort((a, b) => a.nom.localeCompare(b.nom)).map(({ id: codi, nom, municipi, programes, titols }, n) => {
                    return (
                      <ListItem key={n} button className="small-padding-h">
                        <ListItemText
                          primary={`${nom} (${municipi})`}
                          onClick={obreCentre(codi)}
                        />
                        <div className="prog-icons">
                          {Utils.plainArray(programes).map(({ id, nom, simbol }, k) => {
                            const label = `${nom}${titols && titols[id] ? `: ${titols[id]}` : ''}`;
                            return (
                              <IconButton
                                key={k}
                                className="prog-icon"
                                aria-label={label}
                                onClick={obrePrograma(id)}
                              >
                                <img src={`logos/${simbol}`} alt={label} title={label} />
                              </IconButton>
                            );
                          })}
                        </div>
                      </ListItem>
                    )
                  })}
                </List>
              </Paper>
            </section>
            <MapSection {...{ data, programa: null, centre: null, zona: key, cursos, currentPrograms, polygons, mapChanged, history, updateMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaZona;
