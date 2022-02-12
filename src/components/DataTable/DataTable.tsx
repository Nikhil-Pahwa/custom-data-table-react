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
                <thead>
                    <th>name</th>
                    <th>product</th>
                </thead>
                <tbody>
                    <tr>
                        <td>5 star</td>
                        <td>chocolate</td>
                    </tr>
                    <tr>
                        <td>safolla</td>
                        <td>oil</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
