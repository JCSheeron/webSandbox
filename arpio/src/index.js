import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// ReactDOM.render(
ReactDOM.hydrate(
  // Use hydrate for server side rendering (render being deprecated)
  // Render initial data from local window variable instead of
  // empty string, or from a call to the server here.  This
  // is why the server render returned an object with the
  // rendered data and the raw data we stored in window.
  <App initialData={window.initialData} />,
  document.getElementById('root')
);
