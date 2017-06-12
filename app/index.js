// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import './index.css';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

var App = require('./components/App');

ReactDOM.render(
    <App />,
    document.getElementById('app')
);