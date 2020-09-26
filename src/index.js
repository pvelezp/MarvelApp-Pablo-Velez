import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FavoriteProvider } from './context/FavoriteProvider';


ReactDOM.render(
  <FavoriteProvider>
   <App />
  </FavoriteProvider>
 
,
  document.getElementById('root')
);

serviceWorker.register();
