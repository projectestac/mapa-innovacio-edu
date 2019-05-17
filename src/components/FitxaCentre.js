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
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import WebIcon from 'mdi-material-ui/Web';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from 'mdi-material-ui/Twitter';
import Utils from '../utils/Utils';
import Error from './Error';
import MapSection from './MapSection';

const LOGO_BASE = process.env.REACT_APP_LOGO_BASE || 'https://clic.xtec.cat/pub/logos/';

function FitxaCentre({ history, match: { params: { codi } } }) {
  return (
    <AppContext.Consumer>
      {({ data, currentPrograms, polygons, mapChanged, updateMap }) => {
        // Find the specified program
        const centre = data.centres.get(codi);
        if (!centre)
          return <Error {...{ error: `No hi ha cap programa amb el codi: ${codi}`, history }} />

        const { nom, municipi, comarca, estudis, adreca, web, logo, nodes, web_propi, tel, mail, twitter, sstt, se, public: pb, programes, titols, notCert } = centre;
        const url = nodes || web || web_propi;
        const tancaFitxa = () => history.goBack();
        const servei_territorial = data.poligons.get(sstt);
        const servei_educatiu = data.poligons.get(se);
        let hasNc = false;

        return (
          <>
            <Button className="torna" aria-label="Torna" onClick={tancaFitxa} >
              <ArrowBack className="left-icon" />
              Torna
            </Button>
            <section className="seccio centre">
              <Paper className="paper">
                <div className="logo-nom-seccio">
                  {logo && <img className="seccio-logo" src={`${/^http.?:\/\//.test(logo) ? '' : LOGO_BASE}${logo}`} alt={nom} />}
                  <div className="nom-seccio">
                    <Typography variant="h4">{nom}</Typography>
                    <div id="tipus">Centre {pb ? 'públic' : 'privat concertat'}</div>
                  </div>
                </div>
                <div className="adreca">
                  <p>
                    {adreca}<br />
                    {`${municipi} (${comarca})`}<br />
                    {tel && <>{`Tel. ${tel}`}</>}
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
                      <WebIcon className="left-icon" />
                      Web
                    </Button>
                  }
                  {twitter &&
                    <Button
                      variant="contained"
                      className="info-btn"
                      href={`https://twitter.com/${twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={twitter}
                    >
                      <TwitterIcon className="left-icon" />
                      Twitter
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
                <h4>Programes on participa:</h4>
                <br />
                <List >
                  {Utils.plainArray(programes).map(({ id, nom, simbol, cursos }, n) => (
                    <ListItem key={n} button className="no-padding-h-small" component="a" href={`#/programa/${id}`}>
                      <ListItemAvatar>
                        <Avatar src={`logos/mini/${simbol}`} alt={nom} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={nom}
                        secondary={(titols && titols[id]) || `${cursos.length === 1 ? 'Curs' : 'Cursos'} ${cursos.sort().map(c => {
                          const nc = notCert.has(`${id}|${c}`);
                          hasNc = hasNc || nc;
                          return `${c}${nc ? ' *' : ''}`;
                        }).join(', ')}`}
                      />
                    </ListItem>
                  ))}
                </List>
                {hasNc &&
                  <>
                    <br />
                    <Typography>*: Participació en curs, pendent de certificar</Typography>
                  </>
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
