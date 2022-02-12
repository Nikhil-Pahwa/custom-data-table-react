import { Row } from '../types';

import './DataTableBody.scss';

export interface ITableBodyProperties {
    rows: Row[];
}

const DataTableBody: React.FC<ITableBodyProperties> = ({ rows }) => {

    const renderRowItem = (row: Row) => {
        return Object.keys(row).map((rowItem) => {
            return <td>{row[rowItem]}</td>
        });
    }

    const renderTableRows = () => {
        return rows.map((row: Row, index: number) => {
            return <tr data-row-index={index} data-row-id={row["id"]}>
                <td>[]</td>
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
