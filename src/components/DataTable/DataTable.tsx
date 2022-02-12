import DataTableHeader from './DataTableHeader/DataTableHeader';
import DataTableBody from './DataTableBody/DataTableBody';
import { Row, Column } from './types';

import './DataTable.scss';

export interface ITableProperties {
    columns: Column[];
    rows: Row[];
}

const DataTable: React.FC<ITableProperties> = ({ columns, rows }) => {
    return (
        <div className="data-table">
            <table>
                <DataTableHeader columns={columns} />
                <DataTableBody rows={rows} />
            </table>
        </div>
    );
}

export default DataTable;
