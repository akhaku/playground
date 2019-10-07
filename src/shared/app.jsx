import React from 'react';
import Flashcards from 'app/shared/flashcards';

import './app.less';

export default function({cards, view}) {
  return view === 'flashcards' ? <Flashcards cards={cards}/> : (
    <h1>Hello4 world from react</h1>
  );
}
