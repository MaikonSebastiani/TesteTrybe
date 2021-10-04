import React, { useEffect } from 'react';

import FilterByColumn from '../components/filterByColumn';

import { Tables, Container } from './styles';

import Planets from '../components/planets';
import SearchName from '../components/searchName';
import { UseFilterPlanet } from '../context/filterPlanets';

const Table:React.FC = () => {
  const { numberOfFormResult } = UseFilterPlanet();
  const { addColumItens } = UseFilterPlanet();

  useEffect(() => {
    addColumItens([
      {
        columnName: 'População',
        columnValue: 'population',
      },
      {
        columnName: 'Periodo orbital',
        columnValue: 'orbital_period',
      },
      {
        columnName: 'Diametro',
        columnValue: 'diameter',
      },
      {
        columnName: 'Periodo de rotação',
        columnValue: 'rotation_period',
      },
      {
        columnName: 'Superfice da água',
        columnValue: 'surface_water',
      },
    ]);
  }, [addColumItens]);

  return (
    <Container>
      <h1>Star Wars Database</h1>
      <SearchName />

      <p>Filtrar por coluna</p>

      {numberOfFormResult && Object.keys(numberOfFormResult).map((propKey: any) => (
        <FilterByColumn key={propKey} />
      ))}

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
};

export default Table;
