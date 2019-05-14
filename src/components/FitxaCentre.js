import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBack from '@material-ui/icons/ArrowBack';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
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
        const { nom, municipi, comarca, estudis, adreca, web, logo, nodes, web_propi, tel, mail, twitter, sstt, se, public: pb, programes, titols } = centre;
        const url = nodes || web || web_propi;
        const tancaFitxa = () => history.goBack();
        const obrePrograma = id => () => history.push(`/programa/${id}`);
        const servei_territorial = data.poligons.get(sstt);
        const servei_educatiu = data.poligons.get(se);

        return (
          <>
            <Button className="torna" aria-label="Torna" onClick={tancaFitxa} >
              <ArrowBack className="left-icon" />
              Torna
            </Button>
            <section className="seccio centre">
              <Paper className="paper">
                {logo && <><br clear="all" /><img className="cent-logo" src={logo} alt={nom}></img></>}
                <Typography variant="h4">{nom}</Typography>
                <div id="tipus">Centre {pb ? 'públic' : 'privat concertat'}</div>
                <br clear="all" />
                <div id="adreca">
                  <p>
                    {adreca}<br />
                    {`${municipi} (${comarca})`}<br />
                    {tel && <>{`Tel. ${tel}`}<br /></>}
                    {twitter && <><a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">{twitter}</a><br /></>}
                  </p>
                </div>
                <div id="info">
                  {url &&
                    <Button
                      variant="contained"
                      className="info-btn"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={url}
                    >
                      <InfoIcon className="left-icon" />
                      Web
                    </Button>
                  }
                  {mail &&
                    <Button
                      variant="contained"
                      className="info-btn"
                      href={`mailto:${mail}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={mail}
                    >
                      <MailIcon className="left-icon" />
                      Contacte
                    </Button>
                  }
                </div>
                <div id="estudis">
                  <h4>Estudis</h4>
                  <ul>
                    {estudis.map((e, n) => <li key={n}>{data.estudis.get(e)}</li>)}
                  </ul>
                </div>
                <div id="zones">
                  <h4>Zones:</h4>
                  <ul>
                    {servei_territorial && <li><Link to={`/zona/${sstt}`}>{servei_territorial.nom}</Link></li>}
                    {servei_educatiu && <li><Link to={`/zona/${se}`}>{servei_educatiu.nom}</Link></li>}
                  </ul>
                </div>
                <h4>Programes d'innovació educativa on participa:</h4>
                <br />
                {(MODE_PROG_CENTRE === 'perCurs' &&
                  Object.keys(programes)
                    .map((curs, n) => (
                      <ExpansionPanel key={n}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className="wider">CURS {curs}</Typography>
                          <Typography>{`${programes[curs].length} ${programes[curs].length === 1 ? 'programa' : 'programes'}`}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <ul>
                            {programes[curs].map(({ id, nom }, c) => {
                              return (
                                <li key={c} >
                                  <Button onClick={obrePrograma(id)}>{nom}{(titols && titols[id]) ? ` - ${titols[id]}` : ''}</Button>
                                </li>
                              );
                            })}
                          </ul>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    )))
                  ||
                  <List >
                    {Utils.plainArray(programes).map(({ id, nom, simbol, cursos }, n) => (
                      <ListItem key={n} button className="no-padding-h-small">
                        <ListItemAvatar>
                          <Avatar src={`logos/${simbol}`} alt={nom} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={nom}
                          secondary={(titols && titols[id]) || `${cursos.sort().join(', ')}`}
                          onClick={obrePrograma(id)} />
                      </ListItem>
                    ))}
                  </List>
                }
              </Paper>
            </section>
            <MapSection {...{ data, programa: null, centre: codi, zona: null, currentPrograms, polygons, mapChanged, updateMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaCentre;
