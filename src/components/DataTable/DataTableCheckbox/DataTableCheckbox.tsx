import { useEffect, useState } from 'react';
import './DataTableCheckbox.scss';

export interface ITableCheckboxProperties {
    isChecked?: boolean;
    isControlled?: boolean;
}

const DataTableCheckbox: React.FC<ITableCheckboxProperties> = ({ isChecked, isControlled }) => {

    let [controlledProps, setControlledProps] = useState({});

    useEffect(() => {
        if (isControlled) {
            setControlledProps({
                checked: isChecked
            });
        } else {
            setControlledProps({});
        }
    }, [isControlled, isChecked]);

    return (
        <input type="checkbox" {...controlledProps} />
    );
}

export default DataTableCheckbox;
