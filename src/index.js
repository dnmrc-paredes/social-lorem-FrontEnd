import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'

import {persistor, store} from './redux/store/store'

// Components
import App from './App';

ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>,
  document.getElementById('root')
);
