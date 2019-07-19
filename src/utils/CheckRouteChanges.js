/*!
 *  File    : utils/CheckRouteChanges.js
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
import { withRouter } from 'react-router-dom';

// Scroll to top on each router navigation
// See: https://reacttraining.com/react-router/web/guides/scroll-restoration
class CheckRouteChanges extends React.Component {
  constructor(props) {
    super(props);
    this.updateHandler = props.updateHandler;
  }

  componentDidUpdate(prevProps) {
    if (this.updateHandler)
      this.updateHandler(this.props, prevProps);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(CheckRouteChanges);
