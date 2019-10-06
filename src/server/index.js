import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from 'app/shared/app';
import Config from '../../conf/Config';

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
