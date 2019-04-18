import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Utils from '../utils/Utils';

function FitxaCentre({ id, centre, data: { centres }, modeProgCentre, updateMainState }) {

  // Find the specified program
  const thisCentre = centres.get(centre);
  if (!thisCentre) {
    updateMainState({ error: `No hi ha cap centre amb el codi: ${centre}` });
    return null;
  }

  // Els camps tipus, sstt, se també estan disponibles
  const { nom, municipi, comarca, estudis, adreca, web, logo, nodes, web_propi, tel, mail, twitter, sstt, se, public: pb, programes } = thisCentre;
  const url = nodes || web || web_propi;
  const tancaFitxa = () => updateMainState({ centre: null });
  const obrePrograma = id => () => updateMainState({ centre: null, programa: id }, true, true);

  return (
    <section className="seccio centre">
      <div id={id} className="filler" />
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
            {municipi} ({comarca})<br />
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
          {sstt}<br/>{se}
        </div>
        <h4>Programes d'innovació educativa on participa</h4>
        {(modeProgCentre === 'perCurs' &&
          Object.keys(programes)
            .map((curs, n) => (
              <ExpansionPanel key={n}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography component="h5">CURS {curs}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ul>
                    {programes[curs].map(({ id, nom }, c) => {
                      return (
                        <li key={c} >
                          <Button onClick={obrePrograma(id)}><div>{nom}</div></Button>
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
                <Button className="progs-centre" onClick={obrePrograma(id)}>{nom} ({cursos.join(', ')})</Button>
              </li>
            ))}
          </ul>
        }
      </Paper>
    </section>
  );
}

export default FitxaCentre;
