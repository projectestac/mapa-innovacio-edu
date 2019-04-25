import React from 'react';
import Typography from '@material-ui/core/Typography';
import { title, version, repository, license } from '../../package.json';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <a className="logo-gencat" href="https://web.gencat.cat/" title="Generalitat de Catalunya" target="_top">gencat.cat</a>
        <Typography variant="body2" className="copyright">
          <a href="https://innovacio.xtec.cat/">{title} v{version}</a><br />
          <a href="http://www.xtec.cat">© 2019 Departament d'Educació de la Generalitat de Catalunya</a><br />
          <a href={`https://spdx.org/licenses/${license}.html`}>Llicència Pública de la Unió Europea {license}</a><br />
          <a href={repository.url}>{repository.url}</a><br />
          <br />
          <a href="https://web.gencat.cat/ca/menu-ajuda/ajuda/avis_legal/"><strong>Avís legal</strong></a>: D’acord amb l’article 17.1 de la Llei 19/2014, la ©Generalitat de Catalunya permet la reutilització dels continguts i de les dades sempre que se'n citi la font i la data d'actualització i que no es desnaturalitzi la informació (article 8 de la Llei 37/2007) i també que no es contradigui amb una llicència específica.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;