import { useState } from 'react';
import './App.scss';
import DataTable from './components/DataTable/DataTable';

function App() {
  let [selectedRow, setSelectedRow] = useState(null);
  let [selectedRowIndex, setSelectedRowIndex] = useState(null);

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
        }]}
        onRowClick={(row: any, index: any) => {
          setSelectedRow(row);
          setSelectedRowIndex(index);
          console.log(row);
        }} />
      <div className="output">
        {selectedRowIndex && (
          <>
            <p className='output__selectedRowIndex'>Row Index: {selectedRowIndex}</p>
            <p className='output__selectedRow'>Selected Row: {JSON.stringify(selectedRow)}</p>
          </>)
        }
      </div>
    </div>
  );
}

export default App;
