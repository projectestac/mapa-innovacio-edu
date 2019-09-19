/*!
 *  File    : components/EmbedLink.js
 *  Created : 19/09/2019
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
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

const APP_BASE_URL = process.env.REACT_APP_BASE_URL || 'https://innovacio.xtec.gencat.cat/';

function EmbedLink() {
  return (
    <Fab aria-label="Ves al mapa de la innovació"
      size="small"
      variant="extended"
      color="secondary"
      className="embed-link"
      onClick={() => window.open(APP_BASE_URL, '_blank')}
    >
      <NavigationIcon />
      Mapa de la Innovació Educativa
    </Fab>
  );
}

export default EmbedLink;