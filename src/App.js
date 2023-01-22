import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  readFavoritePokemonIds,
  updateFavoritePokemon,
} from './services/pokedexService';

import pokemonList from './data';
// console.log('pokemonlistApp', pokemonList);
import Routes from './routes';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isPokemonFavoriteById: this.setIsPokemonFavoriteById() };
  }

  onUpdateFavoritePokemon(pokemonId, isFavorite) {
    updateFavoritePokemon(pokemonId, isFavorite);

    this.setState(({ isPokemonFavoriteById: this.setIsPokemonFavoriteById() }));
  }

  setIsPokemonFavoriteById() {
    const favoritePokemonIds = readFavoritePokemonIds();
    // console.log('favoritePokemonIds:', favoritePokemonIds);
    // console.log('pokemonList:', pokemonList);
    const isPokemonFavorite = pokemonList.reduce((acc, pokemon) => {
      // console.log(pokemon);
      // console.log(acc);
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      // está adicionando chave e valor desta forma:
      // const person1 = {};
      // person1['firstname'] = 'Mario';
      // person1['lastname'] = 'Rossi';
      return acc;
    }, {});
    // console.log('isPokemonFavorite:', isPokemonFavorite);
    return isPokemonFavorite; // retorna um objeto no formato {4: fase, 10: true}
  }

  render() {
    const { isPokemonFavoriteById } = this.state;
    const favoritePokemon = pokemonList.filter(({ id }) => isPokemonFavoriteById[id]);

    return (
      <div className="App">
        <h1>Pokédex</h1>
        <nav>
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/about">About</Link>
          <Link className="link" to="/favorites">Favorite Pokémon</Link>
        </nav>
        <Routes
          favoritePokemon={ favoritePokemon }
          pokemonList={ pokemonList }
          isPokemonFavoriteById={ isPokemonFavoriteById }
          onUpdateFavoritePokemon={
            (pokemonId, checked) => this.onUpdateFavoritePokemon(pokemonId, checked)
          }
        />
      </div>
    );
  }
}

export default App;
