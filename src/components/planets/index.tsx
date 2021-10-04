import React, { useEffect, useCallback } from 'react';
import { Component } from './styles';

import { UsePlanets } from '../../context/planets';
import { UseFilterPlanet } from '../../context/filterPlanets';

const Planets: React.FC = () => {
  const { getPlanets } = UsePlanets();
  const { data } = UsePlanets();

  const { filterPlanetName } = UseFilterPlanet();
  const { filterResult } = UseFilterPlanet();

  useEffect(() => {
    async function fetchData() {
      await getPlanets();
    }
    fetchData();
  }, [getPlanets]);

  return (
    <Component>
      { filterResult ? (
        Object.keys(filterResult).map((propKey: any) => (
          <tr key={propKey}>
            <td>{filterResult[propKey].name}</td>
            <td>{filterResult[propKey].rotation_period}</td>
            <td>{filterResult[propKey].orbital_period}</td>
            <td>{filterResult[propKey].diameter}</td>
            <td>{filterResult[propKey].climate}</td>
            <td>{filterResult[propKey].gravity}</td>
            <td>{filterResult[propKey].terrain}</td>
            <td>{filterResult[propKey].surface_water}</td>
            <td>{filterResult[propKey].population}</td>
            <td>{filterResult[propKey].films}</td>
            <td>{filterResult[propKey].created}</td>
            <td>{filterResult[propKey].edited}</td>
            <td>{filterResult[propKey].url}</td>
          </tr>
        ))
      ) : (
        data && Object.keys(data.results).map((propKey: any) => (
          <tr key={propKey}>
            <td>{data.results[propKey].name}</td>
            <td>{data.results[propKey].rotation_period}</td>
            <td>{data.results[propKey].orbital_period}</td>
            <td>{data.results[propKey].diameter}</td>
            <td>{data.results[propKey].climate}</td>
            <td>{data.results[propKey].gravity}</td>
            <td>{data.results[propKey].terrain}</td>
            <td>{data.results[propKey].surface_water}</td>
            <td>{data.results[propKey].population}</td>
            <td>{data.results[propKey].films}</td>
            <td>{data.results[propKey].created}</td>
            <td>{data.results[propKey].edited}</td>
            <td>{data.results[propKey].url}</td>
          </tr>
        ))
      )}
    </Component>
  );
};

export default Planets;
