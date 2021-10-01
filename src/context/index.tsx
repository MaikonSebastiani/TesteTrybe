import React
  from 'react';
import { PlanetsProvider } from './planets';
import { FilterNameProvider } from './filterPlanets';
import { FilterColumProvider } from './filterColum';

const AppProvider: React.FC = ({ children }) => (
  <FilterNameProvider>
    <FilterColumProvider>
      <PlanetsProvider>
        {children}
      </PlanetsProvider>
    </FilterColumProvider>
  </FilterNameProvider>
);

export default AppProvider;
