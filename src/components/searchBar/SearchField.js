import React, { useState } from 'react';

import styled from "styled-components";
import { FaSearch } from "react-icons/fa"

function SearchField( {search} ) {
  const [filterValue, setFilterValue] = useState("");

  return (
    <Container>
      <Title> Name or Number </Title>
      <SearchContainer>
        <InputField onChange={ event => setFilterValue(event.target.value)}/>
        <Button onClick={ () => search(filterValue)}> <FaSearch /> </Button>
      </SearchContainer>
    </Container>
  );
}

export default SearchField;

const Container = styled.div`
  background-color: #252626;
  padding: 20px 45px 15px 45px;
`

const Title = styled.h4`
  color: white;
  font-size: 22px;
  font-weight: 300;
  margin:0;
`

const SearchContainer = styled.div`
  display: flex;
  margin-top: 5px;
`

const InputField = styled.input`
  border: 3px solid #4a4a4a;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
`

const Button = styled.button`
  background-color: #e8611e;
  color: white;
  border: 0;
  margin-left: 10px;
  border-radius: 3px;
  display: flex;
  font-size: 17px;
  align-items: center;
  padding: 0 15px;
`