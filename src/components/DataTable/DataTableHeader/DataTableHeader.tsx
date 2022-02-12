import DataTableCheckbox from '../DataTableCheckbox/DataTableCheckbox';
import { Column } from '../types';

import './DataTableHeader.scss';

export interface ITableHeaderProperties {
    columns: Column[];
}

const DataTableHeader: React.FC<ITableHeaderProperties> = ({ columns }) => {
    const getHeaderStyle = (column: Column) => {
        return { minWidth: (column.width) ? column.width : 'auto' };
    };

    const renderTableHeaders = () => {
        return columns.map((column: Column) => {
            return <th key={column.id} style={getHeaderStyle(column)}>{column.label}</th>
        });
    }
    return (
        <thead>
            <th><DataTableCheckbox /></th>
            {renderTableHeaders()}
        </thead>
    );
}

export default DataTableHeader;
