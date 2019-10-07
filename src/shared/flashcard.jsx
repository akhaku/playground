import React from 'react';

import './flashcard.less'

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: true,
    };
  }

  renderFront() {
    return (
      <div class="Container-Flashcard">
        <p>{this.props.card.front}</p>
        <button onClick={() => this.setState({front: false})}>Flip</button>
      </div>
    );
  }

  renderBack() {
    const lines = this.props.card.back.map((line, i) => <p key={i}>{line}</p>);
    return (
      <div class="Container-Flashcard">
        {lines}
        <button onClick={() => {
          this.setState({front: true});
          this.props.nextCard();
        }}>Next</button>
      </div>
    );
  }

  render() {
    return this.state.front ? this.renderFront() : this.renderBack();
  }
}
