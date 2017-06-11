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
		this.setState({ pokemonList: this.state.pokemonList.filter(item => item.id !== id) }, this.removeToJsonServer(id));
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
		const path = ReactDOM.findDOMNode(this.refs.path).value;

		let pokemon = {
			"id": this.state.pokemonList.length + 15,
			"name": name,
			"description": description,
			"img_path": `./images/${path}`
		}

		this.setState({
			pokemonList: this.state.pokemonList.concat(pokemon)
		}, this.insertToJsonServer(pokemon));

		this.clearAllInputs()
	}

	insertToJsonServer(pokemon) {
		$.ajax({
			type: "POST",
			url: 'http://localhost:3004/pokemons',
			data: pokemon
		});
	}

	removeToJsonServer(id) {
		console.log('Não ta chamando o id');
		$.ajax({
			url: 'http://localhost:3004/pokemons/'+id,
			type: 'DELETE',
			success: function (result) {
				// Do something with the result
			}
		});
	}

	clearAllInputs() {
		ReactDOM.findDOMNode(this.refs.name).value = "";
		ReactDOM.findDOMNode(this.refs.description).value = "";
		ReactDOM.findDOMNode(this.refs.path).value = "";
	}

	render() {
		return (
			<div className="Pokedex">
				<div className="container-grid">
					<div className="item">
						{this.createPokemonCards(this.state.pokemonList)}
					</div>
				</div>
				<div className="container-form bold-border">
					<h3 className="text-merriweather text-center">Novo</h3>
					<form onSubmit={this.insertNewCard}>
						<label className="label-form color-white" htmlFor="name">Nome: </label>
						<input className="input-form" type='text' ref='name' />
						<label className="label-form color-white" htmlFor="descriptin">Descrição: </label>
						<input className="input-form" type='text' ref='description' />
						<label className="label-form color-white" htmlFor="descriptin">Path Img: </label>
						<input className="input-form" type='text' ref='path' />
						<button type='submit' className="confirm-button">Salvar</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Pokedex;