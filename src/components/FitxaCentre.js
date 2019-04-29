import React from 'react';
import AppContext from '../AppContext';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Utils from '../utils/Utils';
import Error from './Error';
import MapSection from './MapSection';

// Possible values are `perCurs` and `agregat`
const MODE_PROG_CENTRE = process.env.REACT_APP_MODE_PROG_CENTRE || 'agregat';

function FitxaCentre({ history, match: { params: { codi } } }) {
  return (
    <AppContext.Consumer>
      {({ data, currentPrograms, polygons, mapChanged, updateMap }) => {
        // Find the specified program
        const centre = data.centres.get(codi);
        if (!centre)
          return <Error {...{ error: `No hi ha cap programa amb el codi: ${codi}`, history }} />

        // Els camps tipus, sstt, se també estan disponibles
        const { nom, municipi, comarca, estudis, adreca, web, logo, nodes, web_propi, tel, mail, twitter, sstt, se, public: pb, programes } = centre;
        const url = nodes || web || web_propi;
        const tancaFitxa = () => history.goBack();
        const obrePrograma = id => () => history.push(`/programa/${id}`);

        return (
          <>
            <section className="seccio centre">
              <div id="centre" className="filler" />
              <Button className="torna" aria-label="Torna" onClick={tancaFitxa} >
                <ArrowBack className="leftIcon" />
                Torna
            </Button>
              <Paper className="paper">
                {logo && <><br clear="all" /><img className="cent_logo" src={logo} alt={nom}></img></>}
                <h3>{nom}</h3>
                <div id="tipus">Centre {pb ? 'públic' : 'privat concertat'}</div>
                <br clear="all" />
                <div id="adreca">
                  <p>
                    {adreca}<br />
                    {`${municipi} (${comarca})`}<br />
                    {tel && <>{`Tel. ${tel}`}<br /></>}
                    {mail && <><a href={`mailto:${mail}`}>{mail}</a><br /></>}
                    {twitter && <><a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">{twitter}</a><br /></>}
                  </p>
                </div>
                {url && (
                  <div id="link">
                    <h4>Portal web del centre</h4>
                    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                  </div>)}
                <div id="estudis">
                  <h4>Estudis que s'hi imparteixen</h4>
                  {estudis.join(', ')}
                </div>
                <div id="zones">
                  <h4>Zona</h4>
                  {sstt}<br />
                  {se}
                </div>
                <h4>Programes d'innovació educativa on participa</h4>
                {(MODE_PROG_CENTRE === 'perCurs' &&
                  Object.keys(programes)
                    .map((curs, n) => (
                      <ExpansionPanel key={n}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className="wider">CURS {curs}</Typography>
                          <Typography>{`${programes[curs].length} ${programes[curs].length===1 ? 'programa' : 'programes'}`}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <ul>
                            {programes[curs].map(({ id, nom }, c) => {
                              return (
                                <li key={c} >
                                  <Button onClick={obrePrograma(id)}>{nom}</Button>
                                </li>
                              );
                            })}
                          </ul>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    )))
                  ||
                  <ul>
                    {Utils.plainArray(programes).map(({ id, nom, cursos }, c) => (
                      <li key={c}>
                        <Button className="progs-centre" onClick={obrePrograma(id)}>{`${nom} (${cursos.join(', ')})`}</Button>
                      </li>
                    ))}
                  </ul>
                }
              </Paper>
            </section>
            <MapSection {...{ data, programa: null, centre: codi, currentPrograms, polygons, mapChanged, history, updateMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaCentre;
