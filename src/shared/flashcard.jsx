import React from 'react';

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: true,
    };
  }

  renderFront() {
    return (
      <div>
        <p>{this.props.card.front}</p>
        <button onClick={() => this.setState({front: false})}>Flip</button>
      </div>
    );
  }

  renderBack() {
    const lines = this.props.card.back.map((line, i) => <p key={i}>{line}</p>);
    return (
      <div>
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
