import React, {
  createContext, useState, useContext, useCallback,
} from 'react';
import api from '../service';

interface ResultsProps {
    climate: string;
    diameter: string;
    gravity: string;
    name: string;
    orbital_period: string;
    population: string;
    rotation_period: string;
    surface_water: string;
    terrain: string;
    url: string;
}

interface PlanetsState {
    count: number;
    next: string;
    previous: string;
    results: ResultsProps
}

interface PlanetsContextData {
    data: any
    getPlanets(): Promise<void>;
}

const PlanetsContext = createContext<PlanetsContextData>({} as PlanetsContextData);

const PlanetsProvider: React.FC = ({ children }) => {
  const [planet, setPlanet] = useState<PlanetsState>();

  const getPlanets = useCallback(async () => {
    const response = await api.get<PlanetsState>('planets');
    setPlanet(response.data);
  }, []);

  return (
    <PlanetsContext.Provider value={{ data: planet, getPlanets }}>
      {children}
    </PlanetsContext.Provider>
  );
};

function UsePlanets(): PlanetsContextData {
  const context = useContext(PlanetsContext);

  if (!context) {
    throw new Error('UsePlanets must be used within an PlanetsProvider');
  }

  return context;
}

export { PlanetsProvider, UsePlanets };
