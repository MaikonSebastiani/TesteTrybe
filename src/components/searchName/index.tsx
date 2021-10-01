import React, { useRef, useCallback } from 'react';
import { Container } from './styles';
import { UseFilterPlanet } from '../../context/filterPlanets';
import { UsePlanets } from '../../context/planets';

const SearchName: React.FC = () => {
  const { filterPlanetName } = UseFilterPlanet();

  const { data } = UsePlanets();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback(() => {
    if (inputRef.current?.value && data) {
      filterPlanetName(inputRef.current?.value, data);
    } else {
      filterPlanetName('', data);
    }
  }, [filterPlanetName, data]);

  return (
    <>
      <Container
        type="text"
        placeholder="Filtrar planetas por Nome"
        onChange={handleInputChange}
        ref={inputRef}
        width="30%"
      />
    </>
  );
};

export default SearchName;
