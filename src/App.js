import React, { Component } from 'react';
import Topo from './Topo';
import Footer from './Footer';
import Pokedex from './Pokedex';

class App extends Component {
	render() {
		return (
			<div>
				<Topo />
				<Pokedex />
				<Footer />
			</div>
		);
	}
}

export default App;