import { useState, useEffect } from 'react';

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
    let [selectedItemsIds, setSelectedItemsIds] = useState(Array());

    useEffect(() => {
        onSelectionChanges([...selectedItemsIds]);
    }, [selectedItemsIds]);

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

    return (
        <div className="data-table">
            <table onClick={onTableClick}>
                <DataTableHeader columns={columns} />
                <DataTableBody rows={rows} />
            </table>
        </div>
    );
}

export default DataTable;
