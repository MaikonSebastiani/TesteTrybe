import React from 'react';
import AppProvider from './context';

import Table from './Table';

const App: React.FC = () => (
  <AppProvider>
    <Table />
  </AppProvider>
);

export default App;
