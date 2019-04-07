import React from 'react';
import { title, version, repository, license } from '../../package.json';

function Footer() {
  return (
    <footer className="foot">
      <p>
        <a href="https://innovacio.xtec.cat/">{title} v{version}</a><br />
        <a href="http://www.xtec.cat">© 2019 Xarxa Telemàtica Educativa de Catalunya (XTEC)</a><br />
        <a href={`https://spdx.org/licenses/${license}.html`}>Llicència Pública de la Unió Europea {license}</a><br />
        <a href={repository.url}>{repository.url}</a>
      </p>
    </footer>
  );
}

export default Footer;