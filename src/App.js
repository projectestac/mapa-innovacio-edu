import React, { useState, useEffect } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { Panel } from 'primereact/panel';
import { TabView, TabPanel } from 'primereact/tabview';
import { checkFetchJsonResponse, getQueryParam } from './utils/utils';
import Centres from './components/Centres';

const DATA_PATH = 'data';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(true);

  useEffect(() => {
    const qp = getQueryParam('mode');
    setLoading(true);

    Promise.all(
      [
        `${DATA_PATH}/programes.json`,
        `${DATA_PATH}/instancies.json`,
        `${DATA_PATH}/centres.json`,
        `${DATA_PATH}/poligons.json`,
        `${DATA_PATH}/estudis.json`,
      ].map(uri => fetch(uri, { method: 'GET', credentials: 'same-origin' })
        .then(checkFetchJsonResponse))
    )
      .then(([programes, instancies, centres, poligons, estudis]) => {
        setData({ programes, instancies, centres, poligons, estudis });
        console.log(`S'han carregat ${instancies.length} instàncies`);
      })
      .catch(err => setError(err?.toString() || 'Error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PrimeReactProvider>
      <div className="root">
        {loading && <Panel header="Informació"><p>S'estan carregant les dades...</p></Panel>}
        {error && <Panel className="error-panel" header="Error"><p className="m-0">{error}</p></Panel>}
        {!loading && !error && data &&
          <TabView>
            <TabPanel header="Centres">
              <Centres {...{ data }} />
            </TabPanel>
            <TabPanel header="Iniciatives">
              <p className="m-0">bbb</p>
            </TabPanel>
            <TabPanel header="Territoris">
              <p className="m-0">ccc</p>
            </TabPanel>
          </TabView>
        }
      </div>
    </PrimeReactProvider>
  );
}

export default App;
