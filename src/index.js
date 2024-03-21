import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";
import './main.css';

const container = document.getElementById('container');
const root = createRoot(container);
root.render(<App />);
