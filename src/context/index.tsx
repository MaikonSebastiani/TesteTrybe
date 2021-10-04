import React
  from 'react';
import { PlanetsProvider } from './planets';
import { FilterNameProvider } from './filterPlanets';

const AppProvider: React.FC = ({ children }) => (
  <FilterNameProvider>
    <PlanetsProvider>
      {children}
    </PlanetsProvider>
  </FilterNameProvider>
);

export default AppProvider;
