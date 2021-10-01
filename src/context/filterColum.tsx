import React, {
  createContext, useState, useContext, useCallback,
} from 'react';

interface FilterColumProps {
  colum: string;
  comparison: string;
  quantity: number;
  dataPlanets: object
}

interface FilterColumContextData {
    filterColumResult: string | any;
    filterPlanetColum(credentials: FilterColumProps): void;
}

const FilterColumContext = createContext<FilterColumContextData>({} as FilterColumContextData);

const FilterColumProvider: React.FC = ({ children }) => {
  const [filterColumn, setFilterColumn] = useState();

  const filterPlanetColum = useCallback(async ({

    colum, comparison, quantity, dataPlanets,
  }) => {
    console.log('entrou');
    if (colum === 'population') {
      const filtered = dataPlanets.results.filter((elm: any) => elm.population.indexOf(quantity) > -1);
      setFilterColumn(filtered);
    }

    // elm.colum.toLowerCase().indexOf(quantity.toLowerCase()) > -1
  }, []);

  return (
    <FilterColumContext.Provider value={{ filterColumResult: filterColumn, filterPlanetColum }}>
      {children}
    </FilterColumContext.Provider>
  );
};

function UseFilterColum(): FilterColumContextData {
  const context = useContext(FilterColumContext);

  if (!context) {
    throw new Error('UseFilterColum must be used within an FilterColumProvider');
  }

  return context;
}

export { FilterColumProvider, UseFilterColum };
