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
    addColumItens(arrayColumn: any[]): void;
    removeColumItens(item: string): void;
    addForm(arrayForm: object): void;
    removeForm(arrayForm: object): void;
    removeSearchInput(text: string | any): void;
}

const FilterNameContext = createContext<FilterContextData>({} as FilterContextData);

const FilterNameProvider: React.FC = ({ children }) => {
  const [filterText, setFilterText] = useState<any>();
  const [filterColumItens, setfilterColumItens] = useState<any>();
  const [filterColumUsed, setFilterColumUsed] = useState<any>([]);
  const [nameOfForms, setnameOfForms] = useState<any>();

  const filterPlanetName = useCallback((text, data) => {
    if (filterText) {
      const filtered = filterText.filter((elm: any) => elm.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      setFilterText(filtered);

      const dataLocal = filterText.filter((x: any) => !filtered.includes(x));
      localStorage.setItem(text, JSON.stringify(dataLocal));
    } else {
      const filtered = data.results.filter((elm: any) => elm.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      setFilterText(filtered);

      const dataLocal = data.results.filter((x: any) => !filtered.includes(x));
      localStorage.setItem(text, JSON.stringify(dataLocal));
    }
  }, [filterText]);

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
      const dataLocal = filterText.filter((x: any) => !filtered.includes(x));
      localStorage.setItem(colum, JSON.stringify(dataLocal));
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

      const dataLocal = dataPlanets.results.filter((x: any) => !filtered.includes(x));
      localStorage.setItem(colum, JSON.stringify(dataLocal));
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
    if (!nameOfForms) {
      setnameOfForms([arrayForm]);
    } else {
      setnameOfForms((state: any) => [...state, arrayForm]);
    }
  }, [nameOfForms]);

  const removeForm = useCallback((items : Omit<filterColumItensProps, 'dataPlanets'>) => {
    const dataForm = nameOfForms.filter((e: any) => e.nameForm.indexOf(items.colum) > -1);
    setnameOfForms(dataForm);

    const backOption = filterColumUsed.filter((e: any) => e.indexOf(items.colum));

    setFilterColumUsed(backOption);

    const getDataLocal = localStorage.getItem(items.colum);
    if (getDataLocal) {
      const data = filterText;
      setFilterText(data.concat(JSON.parse(getDataLocal)));
      localStorage.removeItem(items.colum);
    }
  }, [nameOfForms, filterColumUsed, filterText]);

  const removeSearchInput = useCallback((text) => {
    const getDataLocal = localStorage.getItem(text.planetName);

    if (getDataLocal) {
      const data = filterText;
      setFilterText(data.concat(JSON.parse(getDataLocal)));
      localStorage.removeItem(text.planetName);
    }
  }, [filterText]);

  return (
    <FilterNameContext.Provider value={{
      filterResult: filterText,
      filterColumItensResult: filterColumItens,
      filterColumUsedResult: filterColumUsed,
      numberOfFormResult: nameOfForms,
      filterPlanetName,
      filterPlanetColum,
      addColumItens,
      removeColumItens,
      addForm,
      removeForm,
      removeSearchInput,
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
