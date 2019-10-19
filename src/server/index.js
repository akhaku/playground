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
    params: {},
  });
});

app.get('/flashcards/', (req, res) => {
  const shuffled = shuffle(Cards);
  const params = {view: 'flashcards', cards: shuffled};
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

function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export default app;
