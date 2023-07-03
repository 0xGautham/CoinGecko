import React from 'react';
import CoinTable from './components/CoinTable';

const App: React.FC = () => {
  return (
    <h1>CoinGeckgo Data
      <div>
        <CoinTable />
      </div>
    </h1>
  );
};

export default App;
