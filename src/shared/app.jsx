import React from 'react';
import Flashcards from 'app/shared/flashcards';

import './app.less';

export default function({cards, history, path, view}) {
  return view === 'flashcards' ? (
    <Flashcards
      cards={cards}
      path={path}
      history={history}
    />
  ) : (
    <h1>Hello4 world from react</h1>
  );
}
