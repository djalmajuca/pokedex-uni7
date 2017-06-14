import React, { Component } from 'react';

class PokemonCard extends Component {

  constructor(props) {
    super(props);

    this.showInfoCard = this.showInfoCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

  showInfoCard() {
    this.props.showInfo(this.props.pokemon);
  }

  removeCard() {
    this.props.remove(this.props.pokemon.id);
  }

  render() {
    return (
      <div className="column3 column little-border">
        <div className="card text-roboto text-center">
          <img className="fluid-img-video" src={require(this.props.pokemon.img_path)} alt={this.props.pokemon.name} />
          <h1 className="color-strong-label">{this.props.pokemon.name}</h1>
        </div>
        <div style={{paddingBottom: '5px'}}>
          <button className="inf-button" onClick={this.showInfoCard}>Informações</button>
          <button className="dangerous-button" onClick={this.removeCard}>Deletar</button>
        </div>
      </div>
    )
  }
}

export default PokemonCard;