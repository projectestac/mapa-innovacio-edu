/*!
 *  File    : literals.js
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


// Textos utilitzats a l'aplicació

import info from '../package.json';
const { homepage: HOMEPAGE = '' } = info;
const PRJLOGOS_BASE = process.env.REACT_APP_PRJLOGOS_BASE || 'https://clic.xtec.cat/pub/innovacio/logos/';
const PRJLOGOS_PATH = `${PRJLOGOS_BASE.startsWith('/') ? HOMEPAGE : ''}${PRJLOGOS_BASE}`;


export const intro = `
<picture><source srcset="${PRJLOGOS_PATH}portada.webp" type="image/webp"/><source srcset="${PRJLOGOS_PATH}portada.png" type="image/png"/><img src="${PRJLOGOS_PATH}portada.png" style="max-width:100%;text-align:center;" alt="Mapa de la innovació pedagògica" /></picture>

És voluntat del Departament d'Educació acompanyar els centres educatius del país en el procés de
transformació educativa per donar resposta a les necessitats del segle XXI i reconèixer els esforços
que s'estan fent en termes d'innovació pedagògica.

El mapa de la innovació pedagògica de Catalunya és un instrument que situa en el territori i
visibilitza totes les iniciatives vinculades a la innovació i a la recerca educativa que es desenvolupa
en els centres educatius i que han estat reconegudes pel Departament d'Educació des del 2015, d'acord
amb el <a href="http://xtec.gencat.cat/ca/innovacio/" target="_blank" rel="noopener noreferrer">Marc de la Innovació Pedagògica de Catalunya</a>. 

Amb el mapa de la innovació es pretén impulsar el treball en xarxa entre els centres que comparteixen
objectius al llarg del territori i posar en valor la informació que faciliti la presa de decisions a
tota la comunitat educativa, a l'administració i a altres agents. Aquesta presa de decisions ha de
permetre promoure la inclusió, la cohesió i l'equitat, i facilitar la participació de tots els centres
en l'èxit educatiu i la innovació per a la millora.

`;

export const progDesc = {
  nom: 'Programes d\'innovació',
  descripcio: `
  Els programes d'innovació consisteixen en plans d'acció que el Departament d'Educació prioritza i impulsa, i que tenen com a finalitat
  millorar els resultats del sistema educatiu adequant-lo al canvi i a l'evolució social.
  Amb la mateixa finalitat també s'inclouen les iniciatives d'altres institucions amb les quals el Departament col·labora mitjançant acords
  o convenis. (Article 2 [Ordre Ens/303/2015](https://dogc.gencat.cat/ca/document-del-dogc/?documentId=704108))  
  `,
  simbol: 'programes.png',
  link: 'http://xtec.gencat.cat/ca/innovacio/programes_innovacio/',
  contacte: 'innovacio@xtec.cat',
};

export const xarxesDesc = {
  nom: 'Xarxes educatives',
  descripcio: `
  El mapa de les xarxes educatives de Catalunya és un instrument que situa en el territori i visibilitza totes les xarxes educatives que estan
  reconegudes pel Departament d'Educació.
  
  Recull la relació de centres educatius que estan treballant en alguna xarxa educativa i d'aprenentatge:  
  - Espai d'aprenentatge col·laboratiu i cooperatiu de centres docents.
  - Es fonamenta en el debat pedagògic i didàctic, en la gestió col·lectiva del coneixement i propicia la construcció de l'aprenentatge compartit.
  - Afavoreix el creixement personal i desenvolupament professional dels docents i la transformació dels centres.
  `,
  simbol: 'xarxes.png',
  link: 'https://projectes.xtec.cat/secrp/',
  contacte: 'serveiseducatius@xtec.cat',
};
