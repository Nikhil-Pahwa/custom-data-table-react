import { useEffect, useState } from 'react';
import DataTable from './components/DataTable/DataTable';
import { MockDataSource } from './sources';

import './App.scss';

function App() {
  let [selectedRow, setSelectedRow] = useState(null);
  let [selectedRowIndex, setSelectedRowIndex] = useState(null);
  let [selectedItems, setSelectedItems] = useState([]);
  let [mockRowData, setMockRowData] = useState([]);
  let mockColumnData = [{
    'id': 'albumId',
    'label': 'Album Id',
    'numeric': true,
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
    'numeric': false,
  },
  {
    'id': 'thumbnailUrl',
    'label': 'Thumbnail Url',
    'numeric': false,
    'width': '50px',
  }];

  useEffect(() => {
    const sources = new MockDataSource();
    sources.fetch().then((data: any) => {
      setMockRowData(data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Click on record</h1>
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
      {(selectedRowIndex || selectedItems.length > 0) && <div className="output">
        {selectedRowIndex &&
          <>
            <p className='output__selectedRowIndex'><b>Clicked Row Index:</b> {selectedRowIndex}</p>
            <p className='output__selectedRow'><b>Clicked Row Info:</b> {JSON.stringify(selectedRow)}</p>
          </>}
        {selectedItems.length > 0 && <p className='output__selectedItems'><b>Selected Rows ID:</b> {selectedItems.toString()}</p>}
      </div>}
    </div >
  );
}

export default App;
