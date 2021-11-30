import React, { useState } from 'react';

import SearchField from "../components/searchBar/SearchField";
import styled from "styled-components";
import pokeBack from '../img/tempPoke.png';
import Pokemon from "../components/pokemon/Pokemon";

function Home() {
  const [filterValue, setFilterValue] = useState("");

  const searchHandler = (filter) => {
    setFilterValue(filter);
  }

  return (
    <Background>
      <div>
        <Title> Pokédex </Title>
        <SearchField search={searchHandler} ></SearchField>
        <PokemonContainer>
          <Pokemon filter={filterValue} ></Pokemon>
        </PokemonContainer>
      </div>
    </Background>
  );
}

export default Home;

const Background = styled.div`
  height: 100%;
  background-image: url(${pokeBack});
  background-repeat: repeat;
`
const Title = styled.h4`
  color: #787878;
  font-size: 25px;
  font-weight: 400;
  background-color: white;
  margin: 0 30px;
  padding: 15px 0 15px 15px;
`

const PokemonContainer = styled.div`
  background-color: white;
  margin: 0 30px 30px 30px;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ::after {
    content: '';
    width: 22%
  }

  @media(max-width: 550px) {
    justify-content: center;
  }
`