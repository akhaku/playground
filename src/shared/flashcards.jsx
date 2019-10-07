import React from 'react';
import Flashcard from 'app/shared/flashcard';

export default class Flashcards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: 0,
    }

    this.nextCard = () => {
      const newCardNumber = (this.state.cardNumber + 1) % this.props.cards.length;
      this.setState({cardNumber: newCardNumber});
    };
  }

  render() {
    return (
      <div>
        <h1>Flashcards</h1>
        <Flashcard
          card={this.props.cards[this.state.cardNumber]}
          nextCard={this.nextCard}
        />
      </div>
    );
  }
}
