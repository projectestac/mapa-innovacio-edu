/*!
 *  File    : index.js
 *  Created : 15/03/2024
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  Map of pedagogical innovation in Catalonia 
 *  https://innovacio.xtec.gencat.cat
 *
 *  @source https://github.com/projectestac/mapa-innovacio-edu
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2024 Educational Telematic Network of Catalonia (XTEC)
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

// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import $ from 'jquery';
import DataTable from 'datatables.net-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-responsive-dt';

// Execute on document ready
$(function () {
  fetch('https://clic.xtec.cat/pub/innovacio/data/instancies.json')
    .then(res => res.json())
    .then(instancies => {
      $('#info-msg').text(`S'han carregat ${instancies.length} instàncies`).removeClass('hidden');
      let table = new DataTable('#data', {
        data: instancies,
        columns: [
          {data: 'centre'},
          {data: 'programa'},
          {data: 'curs'},
        ],
      });
    })
    .catch(err => {
      $('#error-msg').text(`ERROR: ${err}`).removeClass('hidden');
    })
    .finally(() => {
      $('#loading-msg').addClass('hidden');
    });
});



