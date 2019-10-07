/*!
 *  File    : utils/WebAppInstall.js
 *  Created : 10/06/2019
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
import SvgIcon from '@material-ui/core/SvgIcon';

/**
 * Miscellaneous utilities related to the "Add to Home Screen" (A2HS) functionality
 * of progressive web apps (PWA)
 * 
 * See: https://developers.google.com/web/fundamentals/app-install-banners/
 * 
 */

// CSS class used to identify the A2HS button
export const PWA_BTN_CLASSNAME = 'pwa-button';
export const PWA_BTN_SELECTOR = '.pwa-button';

// CSS attributes used to show/hide the A2HS button
export const DISPLAY_ATTR = 'display';
export const DISPLAY_ON = 'inline-block';
export const DISPLAY_OFF = 'none';

/**
 * Material-UI SvgIcon object containing the widely adopted PWA logo
 * See: https://github.com/webmaxru/progressive-web-apps-logo
 * 
 * @param {object} props - Optional additional properties
 * @returns {SvgIcon}
 */
export function PWAIcon(props) {
  return (
    <SvgIcon viewBox="0 0 1952.00 734.93" {...props}>
      <path fill="#3D3D3D" fillOpacity="1" strokeWidth="0.2" strokeLinejoin="round" d="M 1436.62,603.304L 1493.01,460.705L 1655.83,460.705L 1578.56,244.39L 1675.2,0.000528336L 1952,734.933L 1747.87,734.933L 1700.57,603.304L 1436.62,603.304 Z " />
      <path fill="#5A0FC8" fillOpacity="1" strokeWidth="0.2" strokeLinejoin="round" d="M 1262.47,734.935L 1558.79,0.00156593L 1362.34,0.0025425L 1159.64,474.933L 1015.5,0.00351906L 864.499,0.00351906L 709.731,474.933L 600.585,258.517L 501.812,562.819L 602.096,734.935L 795.427,734.935L 935.284,309.025L 1068.63,734.935L 1262.47,734.935 Z " />
      <path fill="#3D3D3D" fillOpacity="1" strokeWidth="0.2" strokeLinejoin="round" d="M 186.476,482.643L 307.479,482.643C 344.133,482.643 376.772,478.552 405.396,470.37L 436.689,373.962L 524.148,104.516C 517.484,93.9535 509.876,83.9667 501.324,74.5569C 456.419,24.852 390.719,0.000406265 304.222,0.000406265L -3.8147e-006,0.000406265L -3.8147e-006,734.933L 186.476,734.933L 186.476,482.643 Z M 346.642,169.079C 364.182,186.732 372.951,210.355 372.951,239.95C 372.951,269.772 365.238,293.424 349.813,310.906C 332.903,330.331 301.766,340.043 256.404,340.043L 186.476,340.043L 186.476,142.598L 256.918,142.598C 299.195,142.598 329.103,151.425 346.642,169.079 Z " />
    </SvgIcon>
  );
};

/**
 * Initializes the A2HS process, registering a listener of `BeforeInstallPrompt` events
 * at window level.
 * When this event is triggered, the global variable `window.__installPromptEvent` is set,
 * and the A2HS buttons (if any) become visibles.
 * 
 * @param {string+} options.attribute - The CSS attribute to be set. Defaults to `display`
 * @param {string+} options.on        - The CSS value used when buttons are visible. Defaults to `inline-block`
 * @param {string+} options.off       - The CSS value used when buttons are not visible. Defaults to `none`
 */
export function webAppInstallInit(options = {}) {

  // Avoid duplicate listeners
  if (!window.__beforeInstallPromptEventListener)
    window.__beforeInstallPromptEventListener = window.addEventListener('beforeinstallprompt', ev => {

      console.log('INFO: BeforeInstallPrompt event received');

      // Prevent Chrome 67 and earlier from automatically showing the prompt
      ev.preventDefault();

      // Stash the triggered event, so it can be triggered later
      window.__installPromptEvent = ev;

      // Display the A2HS buttons, if any
      pwaButtonsSetVisible(true, options);

      // Save options for later use
      window.__installPromptOptions = options;
    });
}

/**
 * To be called when the user hits the A2HS button
 * @param {event} clickEv
 */
export function installHandleClick(clickEv) {

  console.log('INFO: User clicked on "Add to home screen"');

  // Get the previously saved "BeforeInstallPromptEvent"
  const ev = window.__installPromptEvent;

  if (ev) {
    // Clear the global variable
    window.__installPromptEvent = null;

    // Hide the A2HS buttons, if any
    pwaButtonsSetVisible(false, window.__installPromptOptions);

    // Prompt the user about to install this app
    ev.prompt().then(() => {
      ev.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('INFO: User accepted the A2HS prompt');
          } else {
            console.log('INFO: User dismissed the A2HS prompt');
          }
        });
    });
  }
  else
    console.error('ERROR: Call to "installHandleClick" without BeforeInstallPromptEvent!');
}

/**
 * Utility function to determine if the A2HS button should be hidden or visible
 * @param {string+} options.attribute - The CSS attribute to be set. Defaults to `display`
 * @param {string+} options.on        - The CSS value used when buttons are visible. Defaults to `inline-block`
 * @param {string+} options.off       - The CSS value used when buttons are not visible. Defaults to `none`
 */
export function pwaButtonStyle({ attribute = DISPLAY_ATTR, on = DISPLAY_ON, off = DISPLAY_OFF } = {}) {
  const result = {};
  result[attribute] = window.__installPromptEvent ? on : off;
  return result;
}

/** 
 * Sets/unsets the visibility status of the PWA buttons, if any.
 * 
 * @param {boolean} state - `true` when A2HS buttons should be visible.
 * @param {string+} options.attribute - The CSS attribute to be set. Defaults to `display`
 * @param {string+} options.on        - The CSS value used when buttons are visible. Defaults to `inline-block`
 * @param {string+} options.off       - The CSS value used when buttons are not visible. Defaults to `none`
 */
export function pwaButtonsSetVisible(state, { attribute = DISPLAY_ATTR, on = DISPLAY_ON, off = DISPLAY_OFF } = {}) {
  document
    .querySelectorAll(PWA_BTN_SELECTOR)
    .forEach(btn => btn.style[attribute] = state ? on : off);
}
