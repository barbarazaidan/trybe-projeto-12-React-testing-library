import React from 'react';
import PropTypes from 'prop-types';

import { isPokemonFavoriteByIdType, pokemonType } from '../types';
import {
  Button,
  Pokemon,
  PokemonButtonsPanel,
} from '../components';

import './pokedex.css';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemonIndex: 0, filteredType: 'all' };
  }

  filterPokemon(filteredType) {
    this.setState({ filteredType, pokemonIndex: 0 });
  }

  nextPokemon(numberOfPokemon) {
    this.setState((state) => (
      { pokemonIndex: (state.pokemonIndex + 1) % numberOfPokemon }
    ));
  }

  fetchFilteredPokemon() {
    const { pokemonList } = this.props;
    const { filteredType } = this.state;

    return pokemonList.filter((pokemon) => {
      if (filteredType === 'all') return true;
      return pokemon.type === filteredType;
    });
  }

  fetchPokemonTypes() {
    const { pokemonList } = this.props;

    return [...new Set(pokemonList.reduce((types, { type }) => [...types, type], []))];
  }

  render() {
    const { isPokemonFavoriteById } = this.props;
    // console.log('isPokemonFavoriteById:', isPokemonFavoriteById);
    const filteredPokemon = this.fetchFilteredPokemon();
    // console.log('filteredPokemon', filteredPokemon);
    const { pokemonIndex } = this.state;
    const pokemon = filteredPokemon[pokemonIndex];
    // console.log('pokemon', pokemon);
    const pokemonTypes = this.fetchPokemonTypes();
    // console.log('pokemonTypes', pokemonTypes);

    return (
      <div className="pokedex">
        <h2>{`Encountered Pokémon`}</h2>
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ isPokemonFavoriteById[pokemon.id] }
        />
        <PokemonButtonsPanel
          pokemonTypes={ pokemonTypes }
          filterPokemon={ (type) => this.filterPokemon(type) }
        />
        <Button
          dataTestId="next-pokemon"
          className="pokedex-button"
          onClick={ () => this.nextPokemon(filteredPokemon.length) }
          disabled={ filteredPokemon.length <= 1 }
        >
          {`Próximo Pokémon`}
        </Button>
      </div>
    );
  }
}

Pokedex.propTypes = {
  isPokemonFavoriteById: isPokemonFavoriteByIdType.isRequired,
  pokemonList: PropTypes.arrayOf(pokemonType.isRequired).isRequired,
};

export default Pokedex;
