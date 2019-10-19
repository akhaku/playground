/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';

import App from 'app/shared/app';

const history = createBrowserHistory();
const path = history.location.pathname;
const params = {history, path, ...window.params};

ReactDOM.hydrate(<App {...params} />, document.getElementById('app'));
