import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import LocaleProvider from 'antd/lib/locale-provider'
// import enUS from 'antd/lib/locale-provider/en_US'
// 
ReactDOM.render(
  <React.StrictMode>
    {/* <LocaleProvider locale={enUS}> */}
      <App />
    {/* </LocaleProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
