import React from 'react';
import AppContext from '../AppContext';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import Error from './Error';
import MapSection from './MapSection';
import Utils from '../utils/Utils';
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
        const { tipus, nom, logo, cp, adreca, municipi, comarca, tel, fax, correu, web, centresInn } = zona;
        const centresInnArray = Array.from(centresInn).sort((a, b) => a.nom.localeCompare(b.nom));

        // TODO: Canviar a objecte on clau->progid, valor->{prog, [centres]}
        // Millor encara: processar els polígons amb aquesta informació!
        const progsZona = [];
        centresInn.forEach(c => {
          Utils.plainArray(c.programes).forEach(prog => {
            if (!progsZona.find(p => p.id === prog.id))
              progsZona.push(prog);
          })
        });

        const schoolHasProgram = (centre, prog) => Object.keys(centre.programes).find(k => centre.programes[k].find(p => p.id === prog.id));

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
                <h4>Centres d'aquest servei que participen en programes d'innovació:</h4>


                {progsZona.map((prog, n) => (
                  <ExpansionPanel key={n}>
                    <ExpansionPanelSummary className="small-padding-left" expandIcon={<ExpandMoreIcon />}>
                      <Typography className="wider">{prog.nom}</Typography>
                      <Typography>{`...calcular els centres...`}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="small-padding-h">
                      <List dense>
                        {centresInnArray.filter(c => schoolHasProgram(c, prog)).map(({ id: codi, nom, municipi, programes, titols }, n) => {
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
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}


                <hr />
                <List >
                  {centresInnArray.map(({ id: codi, nom, municipi, programes, titols }, n) => {
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
            <MapSection {...{ data, programa: null, centre: null, zona: key, cursos, currentPrograms, polygons, mapChanged, updateMap }} />
          </>
        );
      }}
    </AppContext.Consumer>
  );
}

export default FitxaZona;
