import { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import DataTableHeader from './DataTableHeader/DataTableHeader';
import DataTableBody from './DataTableBody/DataTableBody';
import { Row, Column } from './types';

import './DataTable.scss';


export interface ITableProperties {
    columns: Column[];
    rows: Row[];
    onRowClick: (rowData: Row, rowIndex: number) => void;
    onSelectionChanges: (selectedItems: string[]) => void;
}

const DataTable: React.FC<ITableProperties> = ({ columns, rows, onRowClick, onSelectionChanges }) => {

    const DATA_LENGTH = 15;
    const [partialDataSet, setPartialDataSet] = useState(Array())
    const [counter, setCounter] = useState(0);
    const [numberColumns, setNumberColumns] = useState(Array());
    const [isSelectedAll, setIsSelectedAll] = useState(false);
    const [selectedItemsIds, setSelectedItemsIds] = useState(Array());
    const [isControlledCheckbox, setIsControlledCheckbox] = useState(false);

    const setNextDataSet = () => {
        if (rows.length > (counter + DATA_LENGTH)) {
            const nextDataSet = rows.slice(counter, counter + DATA_LENGTH);
            if (partialDataSet.length > 0) {
                setPartialDataSet(partialDataSet.concat(nextDataSet));
            } else {
                setPartialDataSet([...nextDataSet]);
            }

            setCounter(counter + DATA_LENGTH);
        }
    };

    const handleCheckboxClicks = (event: any) => {
        const isChecked = event.target.checked;
        const dataRowId = event.target.parentElement.parentElement.getAttribute('data-row-id');

        if (dataRowId) {
            if (isChecked) {
                setSelectedItemsIds([...selectedItemsIds, dataRowId]);
            } else {
                const index = selectedItemsIds.indexOf(dataRowId);
                selectedItemsIds.splice(index, 1);
                setSelectedItemsIds([...selectedItemsIds]);
            }
            setIsControlledCheckbox(false);
        } else {
            // Select All Checkbox clicked
            if (isChecked) {
                setSelectedItemsIds([...partialDataSet]);
            } else {
                setSelectedItemsIds([]);
            }
            setIsSelectedAll(isChecked);
            setIsControlledCheckbox(true);
        }
    };

    const handleTableRowClick = (event: any) => {
        const target = event.target.parentElement;
        if (target.nodeName === 'TR') {
            const selectedRow = rows.find((row) => row.id == target.getAttribute('data-row-id'));
            if (selectedRow) {
                onRowClick(selectedRow, target.getAttribute('data-row-index'));
            }
        }
    };

    const onTableClick = (event: any) => {
        if (event.target.nodeName === 'INPUT' && event.target.getAttribute('type') === 'checkbox') {
            handleCheckboxClicks(event);
        } else {
            handleTableRowClick(event);
        }
    };

    useEffect(() => {
        onSelectionChanges([...selectedItemsIds]);
    }, [selectedItemsIds]);

    useEffect(() => {
        setNextDataSet();
    }, [rows]);

    useEffect(() => {
        let numberColumns: number[] = [];
        columns.map((column, i) => {
            if (column.numeric) {
                numberColumns.push(i);
            }
        });
        setNumberColumns(numberColumns);
    }, [columns]);

    return (
        <div className="data-table" id="scrollableDiv">
            <InfiniteScroll
                dataLength={partialDataSet.length}
                next={setNextDataSet}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
            >
                <table onClick={onTableClick}>
                    <DataTableHeader columns={columns} />
                    {partialDataSet.length > 0 && <DataTableBody rows={partialDataSet} numberedColumn={numberColumns} isSelectedAll={isSelectedAll} isControlledCheckbox={isControlledCheckbox} />}
                </table>
            </InfiniteScroll>
        </div>
    );
}

export default DataTable;
