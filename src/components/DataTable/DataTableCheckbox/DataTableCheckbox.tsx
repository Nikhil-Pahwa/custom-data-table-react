export interface ITableCheckboxProperties {
    isChecked?: boolean;
}

const DataTableCheckbox: React.FC<ITableCheckboxProperties> = ({ isChecked }) => {
    return (
        <input type="checkbox" checked={isChecked} />
    );
}

export default DataTableCheckbox;
