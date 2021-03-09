/*!
 *  File    : components/Detallcentres.js
 *  Created : 22/02/2021
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { getInfoSpan, hasExtraInfo } from '../utils/Utils';

function LlistaCentres({ id, llista, curs = null, HOMEPAGE, HASH, history }) {

  const jumpTo = href => ev => {
    ev.preventDefault();
    history.push(href);
  };

  const token = `${id}|${curs}`;
  const hasNc = llista.find(({ notCert }) => notCert.has(token));

  return (
    <>
      <List className="wider">
        {llista.map(({ id: codi, nom, municipi, info, notCert }, c) => {
          const link = `${HOMEPAGE}/${HASH}centre/${codi}`;
          const withInfo = info && hasExtraInfo(info[id]);
          const nc = notCert.has(token);
          return (
            <ListItem key={c} button component={withInfo ? 'div' : 'a'} href={link} className="small-padding-h" onClick={withInfo ? jumpTo(link) : null}>
              <ListItemText
                primary={`${nom} (${municipi})${nc ? ' *' : ''}`}
                secondary={info && info[id] && getInfoSpan(info[id], id, codi)}
              />
            </ListItem>
          )
        })}
      </List>
      {hasNc &&
        <>
          <Divider />
          <Typography color="secondary" className="padding-one">*: Participació en curs</Typography>
        </>
      }
    </>
  );
}

export default LlistaCentres;


