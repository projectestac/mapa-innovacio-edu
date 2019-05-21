import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import WebIcon from 'mdi-material-ui/Web';
import MailIcon from '@material-ui/icons/Mail';
import Error from './Error';
import MapSection from './MapSection';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getInfoSpan } from '../utils/Utils';


function FitxaZona({ history, match: { params: { key } } }) {

  return (
    <AppContext.Consumer>
      {({ data, cursos, currentPrograms, polygons, mapChanged, updateMap }) => {
        // Find the specified program
        const zona = data.poligons.get(key);
        if (!zona)
          return <Error {...{ error: `No hi ha cap zona amb el codi: ${key}`, history }} />

        // Els camps id, nomCurt i color no s'utilitzen
        const { tipus, nom, logo, cp, adreca, municipi, comarca, tel, fax, correu, web, centresInn, programes } = zona;
        const programesArray = Array.from(programes).sort((a, b) => a.nom.localeCompare(b.nom));

        const torna = () => history.goBack();

        return (
          <>
            <Button className="torna" aria-label="Torna" onClick={torna} >
              <ArrowBack className="left-icon" />
              Torna
            </Button>
            <section className="seccio zona">
              <Paper className="paper">
                <div className="logo-nom-seccio">
                  {logo && <img className={`seccio-logo ${tipus === 'ST' ? '' : 'se-logo'}`} src={logo} alt={nom} />}
                  <div className="nom-seccio">
                    <Typography variant="h4">{nom}</Typography>
                  </div>
                </div>
                <div className="adreca">
                  <p>
                    {adreca}<br />
                    {`${cp} ${municipi} (${comarca})`}<br />
                    {tel && <>{`Tel. ${tel}`}<br /></>}
                    {fax && <>{`Fax. ${fax}`}<br /></>}
                  </p>
                </div>
                <div id="info">
                  {web &&
                    <Button
                      variant="contained"
                      className="info-btn"
                      href={web}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={web}
                    >
                      <WebIcon className="left-icon" />
                      Web
                    </Button>
                  }
                  {correu &&
                    <Button
                      variant="contained"
                      className="info-btn"
                      href={`mailto:${correu}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={correu}
                    >
                      <MailIcon className="left-icon" />
                      Contacte
                    </Button>
                  }
                </div>
                <h4>Programes amb presència en aquest territori:</h4>
                <br />
                {programesArray.map((prog, n) => {
                  const centres = prog.allCentres.filter(c => centresInn.has(c));
                  const numCentres = centres.length;
                  return (
                    <ExpansionPanel key={n}>
                      <ExpansionPanelSummary classes={{ root: 'small-padding-left', content: 'zona-prog' }} expandIcon={<ExpandMoreIcon />}>
                        <Link className="zona-prog-logo" to={`/programa/${prog.id}`}><Avatar src={`logos/mini/${prog.simbol}`} alt={prog.nom} /></Link>
                        <Typography className="wider">{prog.nom}</Typography>
                        <Typography>{`${numCentres} centre${numCentres === 1 ? '' : 's'}`}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className="small-padding-h">
                        <List>
                          {centres.map(({ id, nom, municipi, info, allPrograms }, n) => (
                            <ListItem key={n} button component="a" href={`#/centre/${id}`} className="small-padding-h">
                              <ListItemText
                                primary={`${nom} (${municipi})`}
                                secondary={(info && info[id] ? getInfoSpan(info[id]) : null)}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })}
              </Paper>
            </section>
            <MapSection {...{ data, programa: null, centre: null, zona: key, cursos, currentPrograms, polygons, mapChanged, updateMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaZona;
