import React, { Component } from 'react';

class PokemonCard extends Component {

  render() {
    return (
      <div className="column3 column">
        <div className="card little-border text-roboto text-center">
          <img className="fluid-img-video" src={require(this.props.pokemon.img_path)} alt={this.props.pokemon.name} />
          <h1 className="color-strong-label">{this.props.pokemon.name}</h1>
          <span className="color-white">{this.props.pokemon.description}</span>
        </div>
      </div>
    )
  }
}

export default PokemonCard;