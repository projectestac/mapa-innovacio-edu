/*!
 *  File    : components/FitxaProjecte.js
 *  Created : 22/05/2019
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  Map of pedagogical innovation in Catalonia 
 *  https://innovacio.xtec.gencat.cat
 *
 *  @source https://github.com/projectestac/mapa-innovacio-edu
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2019 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { getOptimalSrc, VideoIframe, groupInfosByTitle } from '../utils/Utils';
import { AppContext } from '../App';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Error from './Error';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DocumentIcon from 'mdi-material-ui/FileDocument';
import VideoIcon from 'mdi-material-ui/Youtube';
import InfoIcon from '@material-ui/icons/Info';


function FitxaProjecte({ history, match: { params: { id = '' } } }) {
  return (
    <AppContext.Consumer>
      {({ data: { programes, centres }, currentPrjTab, updateMap,
        settings: { HOMEPAGE, LOGO_BASE, FITXA_PROJ_BASE, PRJLOGOS_PATH } }) => {

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
          !(info = groupInfosByTitle(infoGroup)[infoIndex])
        )
          return <Error {...{ error: `No hi ha cap projecte amb el codi "${id}"`, history }} />

        // Deconstruct main objects
        const { titol, fitxa, video, url, curs } = info;
        const { id: codiCentre, nom: nomCentre, municipi, logo } = centre;
        const { id: idProg, nom: nomProg, simbol: simbolProg } = programa;

        // Check if tabs are needed
        const tabMode = (fitxa ? true : false) && (video ? true : false);
        const tabSelected = (_ev, value) => updateMap({ currentPrjTab: value });

        return (
          <>
            <Helmet>
              <title>{`${titol} - Mapa de la innovació pedagògica de Catalunya`}</title>
              <meta name="description" content={`Projecte "${titol}" - ${nomCentre} (${municipi}) - curs ${curs}`} />
            </Helmet>
            <Button className="torna" aria-label="Torna" onClick={() => history.goBack()} >
              <ArrowBack className="left-icon" />
              Torna
            </Button>
            <section className="seccio projecte">
              <Paper className="paper">
                <Typography variant="h4">Projecte "{titol}"</Typography>
                <div className="info-proj">
                  <img src={getOptimalSrc(logo ? `${/^http.?:\/\//.test(logo) ? '' : LOGO_BASE}${logo}` : `${PRJLOGOS_PATH}logo_${nomCentre.startsWith('Escola') ? 'cole' : 'insti'}.png`)} alt={nomCentre} />
                  <Typography variant="h6"> <Link to={`/centre/${codiCentre}`}>{nomCentre}</Link><br />{municipi}</Typography>
                  <img src={getOptimalSrc(`${PRJLOGOS_PATH}${simbolProg}`)} alt={nomProg} />
                  <Typography variant="h6"> <Link to={`/programa/${idProg}`}>{nomProg}</Link><br />Curs {curs}</Typography>
                  {url &&
                    <Button
                      variant="contained"
                      className="info-btn"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={url}>
                      <InfoIcon className="left-icon" />
                        Més informació sobre el projecte
                    </Button>
                  }
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
                        icon={<VideoIcon />}
                      />
                      <Tab
                        label="Fitxa"
                        icon={<DocumentIcon />}
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