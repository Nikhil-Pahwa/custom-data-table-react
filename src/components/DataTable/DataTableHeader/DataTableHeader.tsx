import { Column } from '../types';

import './DataTableHeader.scss';

export interface ITableHeaderProperties {
    columns: Column[];
}

const DataTableHeader: React.FC<ITableHeaderProperties> = ({ columns }) => {
    const getHeaderStyle = (column: Column) => {
        return { width: (column.width) ? column.width : 'auto' };
    };

    const renderTableHeaders = () => {
        return columns.map((column: Column) => {
            return <th key={column.id} style={getHeaderStyle(column)}>{column.label}</th>
        });
    }
    return (
        <thead>
            <th>[]</th>
            {renderTableHeaders()}
        </thead>
    );
}

export default DataTableHeader;
