
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

/**
 * Miscellaneous utilities related to the "Add to Home Screen" (A2HS) functionality
 * of progressive web apps (PWA)
 * 
 * See: https://developers.google.com/web/fundamentals/app-install-banners/
 * 
 */

// Class name used to identify the A2HS button
// Only the first object with this class will be used
export const A2HS_BTN_CLASSNAME = 'pwa-button';
export const PWA_BTN_SELECTOR = '.pwa-button';
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
 * Initializes the A2HS process, registering a listener of BeforeInstallPrompt events
 * at window level.
 * When this event is triggered, the global variable `window.installPromptEvent` is set,
 * and the A2HS button (if any) switchs from hidden to visible.
 */
export function a2hsInit() {
  // Avoid duplicate listeners
  if (!window.beforeInstallPromptEventListener)
    window.beforeInstallPromptEventListener = window.addEventListener('beforeinstallprompt', ev => {

      // Prevent Chrome 67 and earlier from automatically showing the prompt
      ev.preventDefault();

      // Stash the triggered event, so it can be triggered later
      window.installPromptEvent = ev;

      // Display the A2HS button, if any
      const btn = document.querySelector(PWA_BTN_SELECTOR);
      if (btn)
        btn.style.display = DISPLAY_ON;

      console.log(`Deferred prompt for PWA set`);
    });
}

/**
 * To be called when the user hits the A2HS button
 * @param {event} clickEv
 */
export function a2hsHandleClick(clickEv) {

  console.log('Click on "Add to home screen" button');

  // Get the previously saved "BeforeInstallPromptEvent"
  const ev = window.installPromptEvent;

  if (ev) {
    // Clear the global variable
    window.installPromptEvent = null;

    // Hide the A2HS button
    const btn = document.querySelector(PWA_BTN_SELECTOR);
    if (btn)
      btn.style.display = DISPLAY_OFF;

    // Prompt the user about to install this app
    ev.prompt().then(() => {
      ev.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
        });
    });
  }
  else
    console.log('ERROR: Call to "a2hsHandleClick" without BeforeInstallPromptEvent!');
}

/**
 * Utility function to determine if the A2HS button should be hidden or visible
 * @param {object+} - options - used to set specific CSS settings:
 *                   - attribute (defaults to 'display')
 *                   - on (defaults do 'inline-block')
 *                   - off (defaults to 'none')
 */
export function a2hsButtonStyle(options = {}) {
  const result = {};
  result[options.attribute || 'display'] = window.installPromptEvent ? options.on || DISPLAY_ON : options.off || DISPLAY_OFF;
  return result;
}
