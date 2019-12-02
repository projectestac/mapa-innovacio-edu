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
  if (!window.__beforeInstallPromptEventListener) {
    // Clear event, if any
    window.__installPromptEvent = null;

    // Save options for later use
    window.__installPromptOptions = options;

    // Set the "install prompt" listener
    window.__beforeInstallPromptEventListener = window.addEventListener('beforeinstallprompt', ev => {

      console.log('INFO: BeforeInstallPrompt event received');

      // Prevent Chrome 67 and earlier from automatically showing the prompt
      ev.preventDefault();

      // Stash the triggered event, so it can be triggered later
      window.__installPromptEvent = ev;

      // Display the A2HS buttons, if any
      pwaButtonsSetVisible(true, options);
    });
  }
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
