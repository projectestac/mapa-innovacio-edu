import React from 'react';
import AppContext from '../AppContext';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import Error from './Error';
import MapSection from './MapSection';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
                      <InfoIcon className="left-icon" />
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
                <h4>Programes d'innovació amb presència en aquest territori:</h4>
                {programesArray.map((prog, n) => {
                  const centres = prog.allCentres.filter(c => centresInn.has(c));
                  const numCentres = centres.length;
                  return (
                    <ExpansionPanel key={n}>
                      <ExpansionPanelSummary className="small-padding-left" expandIcon={<ExpandMoreIcon />}>
                        <Typography className="wider"><Avatar src={`logos/mini/${prog.simbol}`} alt={prog.nom} /> {prog.nom}</Typography>
                        <Typography>{`${numCentres} centre${numCentres === 1 ? '' : 's'}`}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className="small-padding-h">
                        <List dense>
                          {centres.map(({ id, nom, municipi, titols, allPrograms }, n) => (
                            <ListItem key={n} button component="a" href={`#/centre/${id}`} className="small-padding-h">
                              <ListItemText
                                primary={`${nom} (${municipi})`}
                                secondary={(titols && titols[id] ? titols[id] : null)}
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
