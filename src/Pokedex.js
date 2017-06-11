import React, { Component } from 'react';
import PokemonCard from "./PokemonCard";
import ReactDOM from 'react-dom'
import './Pokedex.css'
import $ from "jquery";

class Pokedex extends Component {

	constructor(props) {
		super(props);

		this.state = {
			pokemonList: []
		}

		this.createPokemonCard = this.createPokemonCard.bind(this);
		this.remove = this.remove.bind(this);
		this.insertNewCard = this.insertNewCard.bind(this);
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

	showInfo(pokemon) {
		console.log("Mostrar insformações do pokemon: ", pokemon);
	}

	remove(id) {
		this.setState({ pokemonList: this.state.pokemonList.filter(item => item.id !== id) });
	}

	createPokemonCard(pokemon) {
		return (<PokemonCard key={pokemon.id} pokemon={pokemon} showInfo={this.showInfo} remove={this.remove} />);
	}

	createPokemonCards(pokemonList) {
		return pokemonList.map(this.createPokemonCard);
	}

	insertNewCard(event) {
		event.preventDefault();
		const name = ReactDOM.findDOMNode(this.refs.name).value;
		const description = ReactDOM.findDOMNode(this.refs.description).value;

		console.log("Nome: " , name);
		console.log("Description: " , description);
	}

	render() {
		return (
			<div className="Pokedex">
				<div className="container-grid">
					<div className="item">
						{this.createPokemonCards(this.state.pokemonList)}
					</div>
				</div>
				<div className="container-form">
					<h3 className="text-merriweather text-center">Novo</h3>
					<form onSubmit={this.insertNewCard}>
						<label for="name">Nome: </label>
						<input className="form-styling" type='text' ref='name' placeholder="Nome"/>
						<label for="descriptin">Descrição: </label>
						<textarea ref='description' placeholder="Descrição"></textarea>
						<button type='submit' className="confirm-button">Salvar</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Pokedex;