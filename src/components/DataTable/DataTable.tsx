import DataTableHeader from './DataTableHeader/DataTableHeader';
import DataTableBody from './DataTableBody/DataTableBody';
import { Row, Column } from './types';

import './DataTable.scss';

export interface ITableProperties {
    columns: Column[];
    rows: Row[];
    onRowClick: (rowData: Row, rowIndex: number) => void;
}

const DataTable: React.FC<ITableProperties> = ({ columns, rows, onRowClick }) => {
    const onTableClick = (event: any) => {
        const target = event.target.parentElement;
        if (target.nodeName === 'TR') {
            const selectedRow = rows.find((row) => row.id === target.getAttribute('data-row-id'));
            if (selectedRow) {
                onRowClick(selectedRow, target.getAttribute('data-row-index'));
            }
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
