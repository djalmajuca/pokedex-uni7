import React, { Component } from 'react';
import PokemonCard from "./PokemonCard";
import $ from "jquery";

class Pokedex extends Component {

	constructor(props) {
		super(props);

		this.state = {
			pokemonList: []
		}
	}

	componentWillMount() {
		$.ajax({
			url: 'http://localhost:3004/pokemons',
			dataType: 'json',
			cache: false,
			success: function (data) {
				this.setState({ pokemonList: data });
			}.bind(this),
			error: function (xhr, status, err) {
				console.error('http://localhost:3004/pokemons', status, err.toString());
			}
		});
	};

	createPokemonCard(pokemon) {
		return ( <PokemonCard key={pokemon.id} pokemon={pokemon}/> );
	}

	createPokemonCards(pokemonList) {
		return pokemonList.map(this.createPokemonCard);
	}

	render() {
		return (
			<div className="container-grid">
				<div className="item">
					{this.createPokemonCards(this.state.pokemonList)}
				</div>
			</div>
		);
	}
}

export default Pokedex;