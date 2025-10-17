// import React from 'react';
// import { createRoot } from 'react-dom/client';

// import { ConfigProvider } from './contexts/ConfigContext';

// import './index.scss';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(
//   <ConfigProvider>
//     <App />
//   </ConfigProvider>
// );

// reportWebVitals();



import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; 
import { ConfigProvider } from './contexts/ConfigContext';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ConfigProvider>
    <HashRouter> 
      <App />
    </HashRouter>
  </ConfigProvider>
);

reportWebVitals();
