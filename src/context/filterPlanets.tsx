import React, {
  createContext, useState, useContext, useCallback,
} from 'react';

interface FilterColumProps {
  colum: string;
  comparison: string;
  quantity: number;
  dataPlanets: object
}

interface FilterContextData {
    filterResult: string | any;
    filterPlanetName(text: string, data: object): void;
    filterPlanetColum(credentials: FilterColumProps): void;
}

const FilterNameContext = createContext<FilterContextData>({} as FilterContextData);

const FilterNameProvider: React.FC = ({ children }) => {
  const [filterText, setFilterText] = useState<any>();

  const filterPlanetName = useCallback((text, data) => {
    const filtered = data.results.filter((elm: any) => elm.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
    setFilterText(filtered);
  }, []);

  const filterPlanetColum = useCallback(async ({
    colum,
    comparison,
    quantity,
    dataPlanets,
  }) => {
    const filtered = dataPlanets.results.filter((elm: any) => {
      const evaluate = function evaluate(param1: any, param2 :any) {
        switch (comparison) {
          case 'morethan':
            return param1 >= param2;
          case 'lessthan':
            return param1 <= param2;
          case 'equalto':
            return param1 === param2;
          default:
        }
        return true;
      };

      return evaluate(parseInt(elm[colum], 10), parseInt(quantity, 10)) && elm[colum] !== 'unknown';
    });
    setFilterText(filtered);
  }, []);

  return (
    <FilterNameContext.Provider value={{ filterResult: filterText, filterPlanetName, filterPlanetColum }}>
      {children}
    </FilterNameContext.Provider>
  );
};

function UseFilterPlanet(): FilterContextData {
  const context = useContext(FilterNameContext);

  if (!context) {
    throw new Error('UseFilterPlanetsName must be used within an FilterNameProvider');
  }

  return context;
}

export { FilterNameProvider, UseFilterPlanet };
