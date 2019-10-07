/* eslint-env node */
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from 'app/shared/app';
import Config from '../../conf/Config';
import Cards from 'app/shared/data/cards';

const app = express();

app.set('views', './src/views');
app.set('view engine', 'pug');

app.use(Config.baseJsPath, express.static('lib/static/js'));
app.use(Config.baseImagePath, express.static('lib/static/img'));

app.get('/', (req, res) => {
  const content = ReactDOMServer.renderToString(<App />);
  res.render('index', {
    content,
    baseCssUrl: Config.baseCssUrl,
    baseJsUrl: Config.baseJsUrl,
  });
});

app.get('/flashcards/', (req, res) => {
  const params = {view: 'flashcards', cards: Cards};
  const content = ReactDOMServer.renderToString(<App {...params}/>);
  res.render('index', {
    content,
    baseCssUrl: Config.baseCssUrl,
    baseJsUrl: Config.baseJsUrl,
    params,
  });
});

app.listen(Config.appPort, () => {
  console.log(`Listening on port ${Config.appPort}`);
});

export default app;
