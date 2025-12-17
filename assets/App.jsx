import { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleItemCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <div className="background-gradient"></div>
      <div className="container">
        <header className="app-header">
          <h1>Symfony + React</h1>
          <p className="subtitle">Full-Stack Application Demo</p>
        </header>

        <main>
          <ItemForm onItemCreated={handleItemCreated} />
          <ItemList key={refreshKey} onItemCreated={refreshKey} />
        </main>

        <footer className="app-footer">
          <p>Built with Symfony 6 & React 18</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
