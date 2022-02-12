import React from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable from './components/DataTable/DataTable';

function App() {
  return (
    <div className="App">
      <DataTable columns={[{
        'id': 'product', // Uniq ID to identify column
        'label': 'Product',
        'numeric': false,
        'width': '10px',
      }, {
        'id': 'price',
        'label': 'Price',
        'numeric': true, // Right Align
      }]}
        rows={[{
          'id': 'some_id1',

          'price': 15.2
        }, {
          'id': 'some_id2',
          'price': '$15.5'
        }]} />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
