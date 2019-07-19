/*!
 *  File    : components/Error.js
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
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReportProblem from '@material-ui/icons/ReportProblem';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Refresh from '@material-ui/icons/Refresh';

function Error({ error, history, refetch }) {
  return (
    <div className="err-msg">
      <Typography >
        <ReportProblem className="err-icon" color="secondary" />
        {error || 'Error desconegut!'}
      </Typography>
      {
        (refetch &&
          <Button
            className='action-btn'
            aria-label="Reintenta"
            onClick={refetch}
            variant='outlined' >
            <Refresh className="left-icon" />
            Reintenta
        </Button>) ||
        (history && history.length > 1 &&
          <Button
            className="action-btn"
            aria-label="Torna"
            variant="outlined"
            onClick={() => history.goBack()} >
            <ArrowBack className="left-icon" />
            Torna
        </Button>)
      }
    </div>
  );
}

export default Error;