/* eslint-env node */
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {google} from 'googleapis';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import App from 'app/shared/app';
import Config from '../../conf/Config';
import Cards from 'app/shared/data/cards';
import Routes from 'app/shared/routes';
import {getClient} from 'app/server/googleOAuthClient';

const app = express();

app.set('views', './src/views');
app.set('view engine', 'pug');

app.use(Config.baseJsPath, express.static('lib/static/js'));
app.use(Config.baseImagePath, express.static('lib/static/img'));
app.use(cookieParser(Config.cookieSecret));
app.use(session({
  secret: Config.cookieSecret,
  saveUninitialized: false, resave: false,
}));

// public pages
app.get('/error/', (req, res) => {
  const errorMessage = req.session.errorMessage;
  req.session.errorMessage = '';
  res.render('error', {errorMessage});
});

app.get('/logout/', (req, res) => {
  res.clearCookie('auth');
  res.render('error', {errorMessage: 'Logged out'});
});

app.get('/googleoauth', (req, res) => {
  const client = getClient();
  client.getToken(req.query.code).then(({tokens}) => {
    client.verifyIdToken({
      idToken: tokens.id_token,
      audience: Config.googleClientId,
    }).then(({payload}) => {
      // TODO get authorized user from db
      if (payload.email_verified && payload.email === 'ammar.khaku@gmail.com') {
        const authToken = jwt.sign({
          userId: 1,
          email: payload.email,
          loginTime: new Date().getTime(),
          version: 1,
        }, Config.authTokenSecret);
        res.cookie('auth', authToken, {httpOnly: true});
        res.redirect(Routes.flashcards);
      } else {
        req.session.errorMessage = `Access denied for ${payload.email}`;
        res.redirect('/error/');
      }
    }, err => {
      console.error('Error', err);
      req.session.errorMessage = 'Error, see server logs';
      res.redirect('/error/');
    });
  });
})

app.use((req, res, next) => {
  const authToken = req.cookies.auth;
  if (!isTokenValid(req, authToken)) {
    const scopes = ['email'];
    const url = getClient().generateAuthUrl({scope: scopes});
    res.redirect(url); // TODO capture original url
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  const content = ReactDOMServer.renderToString(<App />);
  res.render('index', {
    content,
    baseCssUrl: Config.baseCssUrl,
    baseJsUrl: Config.baseJsUrl,
    params: {},
  });
});

app.get(Routes.flashcards + '*', (req, res) => {
  const shuffled = shuffle(Cards);
  // params are also passed through to the client side react component as props
  const params = {view: 'flashcards', cards: shuffled, path: decodeURIComponent(req.originalUrl)};
  const content = ReactDOMServer.renderToString(<App {...params}/>);
  res.render('index', {
    content,
    baseCssUrl: Config.baseCssUrl,
    baseJsUrl: Config.baseJsUrl,
    params,
  });
});

app.get(Routes.flashcards.substring(0, Routes.flashcards.length - 1), (req, res) => {
  res.redirect(301, '/flashcards/');
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

function isTokenValid(req, token) {
  if (!token) {
    return false;
  }
  try {
    const payload = jwt.verify(token, Config.authTokenSecret);
    req.userContext = {
      id: payload.userId,
      email: payload.email,
    };
    return true;
  } catch (err) {
    return false;
  }
}

export default app;
