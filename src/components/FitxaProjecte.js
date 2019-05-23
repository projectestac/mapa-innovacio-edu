import React from 'react';
import { Link } from 'react-router-dom';
import { VideoIframe } from '../utils/Utils';
import AppContext from '../AppContext';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Error from './Error';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IcoFitxa from '@material-ui/icons/Assignment';
import IcoVideo from '@material-ui/icons/Videocam';

const LOGO_BASE = process.env.REACT_APP_LOGO_BASE || 'https://clic.xtec.cat/pub/logos/';
const FITXA_PROJ_BASE = process.env.REACT_APP_FITXA_PROJ_BASE || 'https://clic.xtec.cat/pub/projectes/';

function FitxaProjecte({ history, match: { params: { id = '' } } }) {

  return (
    <AppContext.Consumer>
      {({ data, currentPrjTab, updateMap }) => {
        const { programes, centres } = data;

        // Find the specified project
        const [prg, codi, projNum] = id.split('|');
        let programa, centre, infoGroup, infoIndex, info;
        if (
          !prg || !codi || !projNum ||
          isNaN(infoIndex = Number(projNum)) ||
          !(programa = programes.get(prg)) ||
          !(centre = centres.get(codi)) ||
          !(infoGroup = programa.info[codi]) ||
          (infoGroup.length <= infoIndex) ||
          !(info = infoGroup[infoIndex])
        )
          return <Error {...{ error: `No hi ha cap projecte amb el codi "${id}"`, history }} />

        // Deconstruct main objects
        const { titol, fitxa, video, curs } = info;
        const { id: codiCentre, nom: nomCentre, municipi, logo } = centre;
        const { id: idProg, nom: nomProg, simbol: simbolProg } = programa;

        // Check if tabs are needed
        const tabMode = (fitxa ? true : false) && (video ? true : false);
        const tabSelected = (_ev, value) => updateMap({ currentPrjTab: value });

        return (
          <>
            <Button className="torna" aria-label="Torna" onClick={() => history.goBack()} >
              <ArrowBack className="left-icon" />
              Torna
            </Button>
            <section className="seccio projecte">
              <Paper className="paper">
                <Typography variant="h4">Projecte "{titol}"</Typography>
                <div className="info-proj">
                  <img src={logo ? `${/^http.?:\/\//.test(logo) ? '' : LOGO_BASE}${logo}` : `logos/logo_${nomCentre.startsWith('Escola') ? 'cole' : 'insti'}.png`} alt={nomCentre} />
                  <Typography variant="h6"> <Link to={`/centre/${codiCentre}`}>{nomCentre}</Link><br />{municipi}</Typography>
                  <img src={`logos/${simbolProg}`} alt={nomProg} />
                  <Typography variant="h6"> <Link to={`/programa/${idProg}`}>{nomProg}</Link><br />Curs {curs}</Typography>
                </div>
                <div className="proj-media">
                  {tabMode &&
                    <Tabs
                      className="proj-tabs"
                      value={currentPrjTab}
                      onChange={tabSelected}
                      variant="fullWidth"
                    >
                      <Tab
                        label="Video"
                        icon={<IcoVideo />}
                      />
                      <Tab
                        label="Fitxa"
                        icon={<IcoFitxa />}
                      />
                    </Tabs>
                  }
                  {video && (!tabMode || currentPrjTab === 0) &&
                    <VideoIframe
                      className="proj-video"
                      title="Vídeo del projecte"
                      url={video}
                    />
                  }
                  {fitxa && (!tabMode || currentPrjTab === 1) &&
                    <iframe
                      className="proj-pdf"
                      title="Fitxa del projecte"
                      src={`${/^https?:\/\//.test(fitxa) ? '' : FITXA_PROJ_BASE}${fitxa}`}
                      width="100%"
                      height="100%"
                      type="application/pdf"
                      allowFullScreen
                    />
                  }
                </div>
              </Paper>
            </section>
          </>
        );
      }}
    </AppContext.Consumer>
  );

}

export default FitxaProjecte;