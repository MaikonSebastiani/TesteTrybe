import React from 'react';

import { Form } from '@unform/web';
import FilterByColumn from '../components/filterByColumn';

import { Tables, Container } from './styles';

import Planets from '../components/planets';
import SearchName from '../components/searchName';

const Table:React.FC = () => (
  <Container>
    <h1>Star Wars Database</h1>
    <SearchName />

    <p>Filtrar por coluna</p>
    <FilterByColumn />

    <Tables>
      <tbody>
        <tr>
          <th>Nome</th>
          <th>Período de Rotação</th>
          <th>Período Orbital</th>
          <th>Diametro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terreno</th>
          <th>Superfice da água</th>
          <th>População</th>
          <th>Filmes</th>
          <th>Criação</th>
          <th>Edição</th>
          <th>Url</th>
        </tr>
      </tbody>

      <Planets />

    </Tables>

  </Container>
);

export default Table;
