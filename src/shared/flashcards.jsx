import React from 'react';
import Flashcard from 'app/shared/flashcard';
import Routes from 'app/shared/routes';

import './flashcards.less';

export default class Flashcards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: findCardNumber(this.props.path, this.props.cards),
      front: true,
    }
    const numCards = this.props.cards.length;
    this.historyHandler = this.props.history
      && this.props.history.listen((location, action) => {
        this.setState({
          cardNumber: findCardNumber(location.pathname, this.props.cards),
          front: true,
        });
    });
    this.nextCard = () => {
      const newCardNumber = (this.state.cardNumber + 1) % numCards;
      this.props.history.push(`${Routes.flashcards}${this.props.cards[newCardNumber].front}`);
      this.setState({cardNumber: newCardNumber, front: true});
    };
    this.previousCard = () => {
      const newCardNumber = (this.state.cardNumber - 1 + numCards) % numCards;
      this.props.history.push(`${Routes.flashcards}${this.props.cards[newCardNumber].front}`);
      this.setState({cardNumber: newCardNumber, front: true});
    };
  }

  render() {
    return (
      <div className="Container-Flashcards">
        <Flashcard
          card={this.props.cards[this.state.cardNumber]}
          front={this.state.front}
          flipCard={() => this.setState({front: !this.state.front})}
          nextCard={this.nextCard}
          previousCard={this.previousCard}
        />
      </div>
    );
  }
}

function findCardNumber(path, cards) {
  let pathSuffix = path.substring(Routes.flashcards.length);
  if (pathSuffix.endsWith('/')) {
    pathSuffix = pathSuffix.substring(0, pathSuffix.length - 1);
  }
  if (!!pathSuffix) {
    for (let i = 0; i < cards.length; i++) {
      if (pathSuffix === cards[i].front) {
        return i;
      }
    }
  }
  return 0;
}
