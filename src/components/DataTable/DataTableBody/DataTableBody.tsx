import DataTableCheckbox from '../DataTableCheckbox/DataTableCheckbox';
import { Row } from '../types';

import './DataTableBody.scss';

export interface ITableBodyProperties {
    rows: Row[];
    numberedColumn: number[];
    selectedRowsIds: number[];
}

const DataTableBody: React.FC<ITableBodyProperties> = ({ rows, numberedColumn, selectedRowsIds }) => {

    const isNumberedColumn = (index: number) => {
        return numberedColumn.indexOf(index) > -1;
    }

    const isSelectboxChecked = (row: any) => {
        return (selectedRowsIds.indexOf(row.id) > -1);
    }

    const renderRowItem = (row: Row) => {
        return Object.keys(row).map((rowItem, index) => {
            return <td key={index} className={`${isNumberedColumn(index) ? 'right-align' : ''}`}>{row[rowItem]}</td>
        });
    }

    const renderTableRows = () => {
        return rows.map((row: Row, index: number) => {
            return <tr key={row.id} data-row-index={index} data-row-id={row['id']}>
                <td><DataTableCheckbox isChecked={isSelectboxChecked(row)} /></td>
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
