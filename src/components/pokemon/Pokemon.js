import React, { useState, useEffect } from 'react';

import styled from "styled-components";

function Pokemon( {filter}) {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect( () => {
    const fetchData = async () => {
      const res = await fetch(
        'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json',
      );
      const json = await res.json();
      setPokemonList(json.pokemon);
      setFilteredPokemons(json.pokemon)
    };
    fetchData();
  }, []);

  /*
    Tratando valor do filtro
    - Se existir "#" na frente (caso o usuário coloque na hora de digitar), removo
    - Se for número, filtro pela propriedade 'num' (mesmo ela sendo string no JSON)
    - Senão, filtro pela propriedade 'name'
  */

  const searchHandler = (filter) => {
    if(filter){
      let rawFilter = filter;

      if(rawFilter.charAt(0) === "#"){
        rawFilter = rawFilter.substring(1)
      }
  
      if(isNaN(+rawFilter)){
        let newState = [...pokemonList];
        let filterResult = newState.filter( pokemon => {
          return pokemon.name.toLowerCase().includes(rawFilter.toLowerCase())
        })
        
        setFilterValue(rawFilter);
        setFilteredPokemons(filterResult);
      } else {
        let newState = [...pokemonList];
        let filterResult = newState.filter( pokemon => {
          return pokemon.num.includes(rawFilter)
        })
        
        setFilterValue(rawFilter);
        setFilteredPokemons(filterResult);
      }
    }
  }

  if(!filterValue){
    searchHandler(filter)
  } else {
    if(filterValue !== filter){
      setFilterValue(filter)
      searchHandler(filter)
    }
    
    if(!filter){
      setFilterValue("")
      setFilteredPokemons(pokemonList)
    }
  }

  const filterResults = (resultado) => {
    if(resultado.length == 0 && filterValue){
      return (<ErrorMessage> Nenhum resultado encontrado </ErrorMessage>)
    }
  }

  return (
    <>
      {filterResults(filteredPokemons)}
      { filteredPokemons.map( el => ( 
        <SinglePokemon key={el.id}>
          <PokeImageContainer>
            <img src={el.img} alt={el.name}></img>
          </PokeImageContainer>
          <PokeTextContainer>
            <PokeNumber> #{el.num} </PokeNumber> 
            <PokeTitle> {el.name}</PokeTitle>
            { el.type.map( type => 
              <PokeType key={type} poketype={type}> {type}</PokeType>
            )}
          </PokeTextContainer>
        </SinglePokemon>
        )
      )}
    </>
  );
}

export default Pokemon;

const SinglePokemon = styled.div`
  background-color: white;
  min-width: 15%;
  max-width: 130px;
  margin: 30px 5px 0 10px;
`

const ErrorMessage = styled.p`
  border: 1px solid red;
  padding: 10px 20px;
  text-align: center;
`

const PokeImageContainer = styled.div `
  background-color: #d9d9d9;
  border-radius: 5px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
 
`

const PokeTextContainer = styled.div `
  padding: 0 15px;
`

const colorSelector = (el) => {
  switch (el) {
    case 'Normal':
      return "#A8A77A"
    case 'Fire':
      return "#EE8130"
    case 'Water':
      return "#6390F0"
    case 'Electric':
      return "#F7D02C"
    case 'Grass':
      return "#7AC74C"
    case 'Ice':
      return "#96D9D6"
    case 'Fighting':
      return "#C22E28"
    case 'Poison':
      return "#A33EA1"
    case 'Ground':
      return "#E2BF65"
    case 'Flying':
      return "#A98FF3"
    case 'Psychic':
      return "#F95587"
    case 'Bug':
      return "#A6B91A"
    case 'Rock':
      return "#B6A136"
    case 'Ghost':
      return "#735797"
    case 'Dragon':
      return "#6F35FC"
    case 'Dark':
      return "#705746"
    case 'Steel':
      return "#B7B7CE"
    case 'Fairy':
      return "#D685AD"
    default:
      break;
  }
}

const textColorSelector = (el) => {
  switch (el) {
    case 'Normal':
    case 'Fire':
    case 'Water':
    case 'Fighting':
    case 'Poison':
    case 'Flying':
    case 'Psychic':
    case 'Rock':
    case 'Ghost':
    case 'Dragon':
      return "white"

    default:
      return 'black'
  }
}

const PokeType = styled.p `
  padding: 3px 10px;
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  width: 47%;
  background-color: ${props => colorSelector(props.poketype)};
  color: ${props => textColorSelector(props.poketype)};
  border-radius: 5px;
  margin: 0;
  margin-right: 3px;
`

const PokeNumber = styled.p `
  margin: 0;
  font-size: 11px;
  font-weight: 600;
  color: gray;
  padding-top: 2px;
`
const PokeTitle = styled.p `
  margin: 5px 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: #252626;
`
