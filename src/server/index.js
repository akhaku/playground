import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from 'app/shared/app';

const app = express();
const port = process.env.PORT || 3000;

app.set('views', './src/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const content = ReactDOMServer.renderToString(<App />);
  res.render('index', {
    content,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
