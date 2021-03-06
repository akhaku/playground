import {google} from 'googleapis';

import Config from '../../conf/Config';

let client;

const getClient = () => {
  if (!client) {
    client = new google.auth.OAuth2(
          Config.googleClientId,
          Config.googleClientSecret,
          Config.googleRedirectUri);
  }
  return client;
};

export {getClient}
