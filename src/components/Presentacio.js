/*!
 *  File    : components/Presentacio.js
 *  Created : 10/04/2019
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
import { AppContext } from '../App';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MapIcon from '@material-ui/icons/Map';
import { PWA_BTN_CLASSNAME, installHandleClick, pwaButtonStyle } from '../utils/WebAppInstall';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { intro } from '../literals';
import { getOptimalSrc } from '../utils/Utils';

const MD_OPTIONS = {
  rehypePlugins: [rehypeRaw],
};

function Presentacio({ history }) {

  return (
    <AppContext.Consumer>
      {({ data: { programes }, settings: { HOMEPAGE, PRJLOGOS_PATH } }) => {

        return (
          <section className="seccio presenta">
            <Paper className="paper">
              <ReactMarkdown {...MD_OPTIONS}>
                {intro}
              </ReactMarkdown>
              <div className="control-group">
                <Button
                  variant="contained"
                  onClick={() => history.push('/programes')}
                >
                  <MapIcon className="left-icon" color="primary" />
                  Accés al mapa
                </Button>
                <Button
                  className={PWA_BTN_CLASSNAME}
                  variant="contained"
                  style={pwaButtonStyle()}
                  onClick={installHandleClick}
                >
                  <CloudDownloadIcon className="left-icon" color="primary" />
                  Instal·la l'aplicació
                </Button>
              </div>
              <div className="hidden">
                { /* Preload icons in a hidden div */
                  programes && Array.from(programes.values()).map((p, n) => (
                    <img alt="" key={n} src={getOptimalSrc(`${PRJLOGOS_PATH}mini/${p.simbol}`)} />
                  ))
                }
              </div>
            </Paper>
          </section>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Presentacio;