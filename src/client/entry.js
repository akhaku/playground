/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app/shared/app';

const params = window.params;

ReactDOM.hydrate(<App {...params} />, document.getElementById('app'));
