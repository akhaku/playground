import PropTypes from 'prop-types';
import React from 'react';

import './flashcard.less';

function Flashcard(props) {
  const front = (
    <div className="Container-Flashcard">
      <p className="Text-line">{props.card.front}</p>
      <div className="Container-Button">
        <button onClick={props.previousCard}>{'←'}</button>
        <button onClick={props.flipCard}>{'⇄'}</button>
        <button onClick={props.nextCard}>{'→'}</button>
      </div>
    </div>
  );

  const back = (
    <div className="Container-Flashcard">
      <div>
        {props.card.back.map((line, i) => <p className="Text-line" key={i}>{line}</p>)}
      </div>
      <div className="Container-Button">
        <button className="Button-cross" onClick={props.nextCard}>{'✖'}</button>
        <button onClick={props.flipCard}>{'⇄'}</button>
        <button className="Button-check" onClick={props.nextCard}>{'✓'}</button>
      </div>
    </div>
  );

  return props.front ? front : back;
}

Flashcard.propTypes = {
  card: PropTypes.shape({
    front: PropTypes.string.isRequired,
    back: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  flipCard: PropTypes.func.isRequired,
  nextCard: PropTypes.func.isRequired,
};

export default Flashcard;
