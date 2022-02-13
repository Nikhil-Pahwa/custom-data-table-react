import { useEffect, useState } from 'react';
import DataTable from './components/DataTable/DataTable';
import MockComponent from './mock/MockComponent';
import { MockDataSource } from './sources';

import './App.scss';

function App() {
  let [selectedRow, setSelectedRow] = useState(null);
  let [selectedRowIndex, setSelectedRowIndex] = useState(null);
  let [selectedItems, setSelectedItems] = useState([]);
  let [mockRowData, setMockRowData] = useState([]);
  let [mockColumnData, setMockColumnData] = useState([{
    'id': 'albumId',
    'label': 'Album Id',
    'numeric': false,
    'width': '70px',
  }, {
    'id': 'id',
    'label': 'Id',
    'numeric': true,
    'width': '10px',
  },
  {
    'id': 'title',
    'label': 'Title',
    'numeric': false,
    'width': '450px',
  },
  {
    'id': 'url',
    'label': 'Url',
    'numeric': true,
  },
  {
    'id': 'thumbnailUrl',
    'label': 'Thumbnail Url',
    'numeric': true,
    'width': '50px',
  }]);

  useEffect(() => {
    const sources = new MockDataSource();
    sources.fetch().then((data: any) => {
      setMockRowData(data);
      // setMockRowData(data);
    });
  }, []);

  return (
    <div className="App">
      <DataTable columns={mockColumnData}
        rows={mockRowData}
        onRowClick={(row: any, index: any) => {
          setSelectedRow(row);
          setSelectedRowIndex(index);
        }}
        onSelectionChanges={(selectedItems: any) => {
          setSelectedItems(selectedItems);
        }}
      />
      {/* <DataTable columns={[{
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
          'price': <MockComponent />
        }]}
        onRowClick={(row: any, index: any) => {
          setSelectedRow(row);
          setSelectedRowIndex(index);
        }}
        onSelectionChanges={(selectedItems: any) => {
          setSelectedItems(selectedItems);
        }}
      /> */}
      {(selectedRowIndex || selectedItems.length > 0) && <div className="output">
        {selectedRowIndex &&
          <>
            <p className='output__selectedRowIndex'>Row Index: {selectedRowIndex}</p>
            <p className='output__selectedRow'>Selected Row: {JSON.stringify(selectedRow)}</p>
          </>}
        {selectedItems.length > 0 && <p className='output__selectedItems'>Selected Items: {selectedItems.toString()}</p>}
      </div>}
    </div >
  );
}

export default App;
