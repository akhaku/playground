/* eslint-env node */
/* eslint no-process-env: 0 */

const Config = {
  appPort: process.env.PORT || 3000,
  baseJsPath: '/static/js',
  baseImagePath: '/static/img',
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  authTokenSecret: process.env.AUTH_TOKEN_SECRET,
};

Config.baseJsUrl = Config.baseJsPath;
Config.baseCssUrl = Config.baseJsPath;

try {
  const DevOverrides = require('./Config.dev');
  DevOverrides.override(Config);
} catch (e) {
  // expected
}

module.exports = Config;
