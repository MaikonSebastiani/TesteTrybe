import React, {
  createContext, useState, useContext, useCallback,
} from 'react';

interface filterColumItensProps {
  colum: string;
  comparison: string;
  quantity: number;
  dataPlanets: object
}

interface FilterContextData {
    filterResult: string | any;
    filterColumItensResult: string | any;
    filterColumUsedResult: string | any;
    numberOfFormResult: object;
    filterPlanetName(text: string, data: object): void;
    filterPlanetColum(credentials: filterColumItensProps): void;
    addColumItens(arrayColumn: any[]): void
    removeColumItens(item: string): void
    addForm(arrayForm: object): void
}

const FilterNameContext = createContext<FilterContextData>({} as FilterContextData);

const FilterNameProvider: React.FC = ({ children }) => {
  const [filterText, setFilterText] = useState<any>();
  const [filterColumItens, setfilterColumItens] = useState<any>();
  const [filterColumUsed, setFilterColumUsed] = useState<any>([]);
  const [numberOfForms, setnumberOfForms] = useState<any>([
    {
      mumberForm: 'initial',
    },
  ]);

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
    if (filterText) {
      const filtered = filterText.filter((elm: any) => {
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
    } else {
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
    }
  }, [filterText]);

  const addColumItens = useCallback((arrayColumn) => {
    setfilterColumItens(arrayColumn);
  }, []);

  const removeColumItens = useCallback((item) => {
    setFilterColumUsed((state: any) => [...state, item]);
  }, []);

  const addForm = useCallback((arrayForm) => {
    if (numberOfForms.length <= 4) {
      setnumberOfForms((state: any) => [...state, arrayForm]);
    }
  }, [numberOfForms]);

  return (
    <FilterNameContext.Provider value={{
      filterResult: filterText,
      filterColumItensResult: filterColumItens,
      filterColumUsedResult: filterColumUsed,
      numberOfFormResult: numberOfForms,
      filterPlanetName,
      filterPlanetColum,
      addColumItens,
      removeColumItens,
      addForm,
    }}
    >
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
