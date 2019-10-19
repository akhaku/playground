import React from 'react';

import './flashcard.less'

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: true,
    };
    this.flipCallback = () => this.setState({front: !this.state.front});
  }

  renderFront() {
    return (
      <div className="Container-Flashcard">
        <p className="Text-line">{this.props.card.front}</p>
        <div className="Container-Button">
          <button onClick={this.props.previousCard}>←</button>
          <button onClick={this.flipCallback}>⇄</button>
          <button onClick={this.props.nextCard}>→</button>
        </div>
      </div>
    );
  }

  renderBack() {
    const lines = this.props.card.back.map((line, i) => <p className="Text-line" key={i}>{line}</p>);
    return (
      <div className="Container-Flashcard">
        <div>
          {lines}
        </div>
        <div className="Container-Button">
          <button className="Button-cross" onClick={() => {
            this.setState({front: true});
            this.props.nextCard();
          }}>✖</button>
          <button onClick={this.flipCallback}>⇄</button>
          <button className="Button-check" onClick={() => {
            this.setState({front: true});
            this.props.nextCard();
          }}>✓</button>
        </div>
      </div>
    );
  }

  render() {
    return this.state.front ? this.renderFront() : this.renderBack();
  }
}
