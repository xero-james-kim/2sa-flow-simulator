import React from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import { Provider } from 'react-redux'
import { store } from './state/store'
import { Page } from './state/components/page';

function App() {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
}

export default App;
