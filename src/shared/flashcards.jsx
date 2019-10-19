import React from 'react';
import Flashcard from 'app/shared/flashcard';

import './flashcards.less';

export default class Flashcards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: 0,
    }
    const numCards = this.props.cards.length;

    this.nextCard = () => {
      const newCardNumber = (this.state.cardNumber + 1) % numCards;
      this.setState({cardNumber: newCardNumber});
    };

    this.previousCard = () => {
      const newCardNumber = (this.state.cardNumber - 1 + numCards) % numCards;
      this.setState({cardNumber: newCardNumber});
    };
  }

  render() {
    return (
      <div className="Container-Flashcards">
        <Flashcard
          card={this.props.cards[this.state.cardNumber]}
          nextCard={this.nextCard}
          previousCard={this.previousCard}
        />
      </div>
    );
  }
}
