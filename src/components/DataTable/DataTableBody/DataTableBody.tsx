import DataTableCheckbox from '../DataTableCheckbox/DataTableCheckbox';
import { Row } from '../types';

import './DataTableBody.scss';

export interface ITableBodyProperties {
    rows: Row[];
    numberedColumn: number[];
}

const DataTableBody: React.FC<ITableBodyProperties> = ({ rows, numberedColumn }) => {

    const isNumberedColumn = (index: number) => {
        return numberedColumn.indexOf(index) > -1;
    }

    const renderRowItem = (row: Row) => {
        return Object.keys(row).map((rowItem, index) => {
            return <td className={`${isNumberedColumn(index) ? 'right-align' : ''}`}>{row[rowItem]}</td>
        });
    }

    const renderTableRows = () => {
        return rows.map((row: Row, index: number) => {
            return <tr data-row-index={index} data-row-id={row["id"]}>
                <td><DataTableCheckbox /></td>
                {renderRowItem(row)}
            </tr>
        });
    }

    return (
        <tbody>
            {renderTableRows()}
        </tbody>
    );
}

export default DataTableBody;
