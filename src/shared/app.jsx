import PropTypes from 'prop-types';
import React from 'react';
import Flashcards from 'app/shared/flashcards';

import './app.less';

function App({cards, history, path, view}) {
  return view === 'flashcards' ? (
    <Flashcards
      cards={cards}
      path={path}
      history={history}
    />
  ) : (
    <h1>{'Hello world from react'}</h1>
  );
}

App.propTypes = {
  cards: PropTypes.array.isRequired,
  history: PropTypes.object,
  path: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
};

export default App;
