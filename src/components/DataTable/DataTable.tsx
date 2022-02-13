import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import DataTableHeader from './DataTableHeader/DataTableHeader';
import DataTableBody from './DataTableBody/DataTableBody';
import DataTableLoader from './DataTableLoader/DataTableLoader';
import { DATA_BATCH_SIZE, NODE_TYPES, ATTRIBUTE_TYPES, CUSTOM_ATTRIBUTE_TYPES } from './constants';
import { Row, Column } from './types';

import './DataTable.scss';

export interface IDataTableProperties {
    columns: Column[];
    rows: Row[];
    onRowClick: (rowData: Row, rowIndex: number) => void;
    onSelectionChanges: (selectedRowsIds: string[]) => void;
}

const DataTable: React.FC<IDataTableProperties> = ({ columns, rows, onRowClick, onSelectionChanges }) => {

    /*
    *   List of selected rows ids
    */
    const [selectedRowsIds, setSelectedRowsIds] = useState<string[]>([]);

    /*
    *   Partial Data set states for infinte scrolling
    */
    const [partialDataSet, setPartialDataSet] = useState<Row[]>([]);
    const [nextDataSetStartIndex, setNextDataSetStartIndex] = useState<number>(0);
    const [hasMoreDataToLoad, setHasMoreDataToLoad] = useState<boolean>(true);

    /*
    * Columns which are numbered type for right alignment
    */
    const [numberTypeColumnsIndexes, setNumberTypeColumnsIndexes] = useState<number[]>([]);

    const [isSelectedAll, setIsSelectedAll] = useState(false);
    const [isControlledCheckbox, setIsControlledCheckbox] = useState(false);

    const getNextDataSet = () => {
        if (rows.length > 0) {
            let nextDataSet = [];
            if (rows.length > (nextDataSetStartIndex + DATA_BATCH_SIZE)) {
                nextDataSet = rows.slice(nextDataSetStartIndex, nextDataSetStartIndex + DATA_BATCH_SIZE);
                setHasMoreDataToLoad(true);
            } else {
                nextDataSet = rows.slice(nextDataSetStartIndex);
                setHasMoreDataToLoad(false);
            }

            setPartialDataSet([...partialDataSet, ...nextDataSet]);
            setNextDataSetStartIndex(nextDataSetStartIndex + DATA_BATCH_SIZE);
        }
    };

    const handleCheckboxClick = (event: any) => {
        const isChecked = event.target.checked;
        const dataRowId = event.target.parentElement.parentElement.getAttribute('data-row-id');

        if (dataRowId) {
            if (isChecked) {
                setSelectedRowsIds([...selectedRowsIds, dataRowId]);
            } else {
                const index = selectedRowsIds.indexOf(dataRowId);
                selectedRowsIds.splice(index, 1);
                setSelectedRowsIds([...selectedRowsIds]);
            }
            setIsControlledCheckbox(false);
        } else {
            // Select All Checkbox clicked
            if (isChecked) {
                // setSelectedRowsIds([...partialDataSet]);
            } else {
                setSelectedRowsIds([]);
            }
            setIsSelectedAll(isChecked);
            setIsControlledCheckbox(true);
        }
    };

    const handleTableRowClick = (event: any) => {
        const target = event.target.parentElement;
        if (target.nodeName === NODE_TYPES.TABLE_ROW) {
            const selectedRow = rows.find((row) => row.id.toString() === target.getAttribute(CUSTOM_ATTRIBUTE_TYPES.ROWID));
            if (selectedRow) {
                onRowClick(selectedRow, target.getAttribute(CUSTOM_ATTRIBUTE_TYPES.ROWINDEX));
            }
        }
    };

    const onTableClick = (event: any) => {
        if (event.target.nodeName === NODE_TYPES.INPUT && event.target.getAttribute('type') === ATTRIBUTE_TYPES.CHECKBOX) {
            handleCheckboxClick(event);
        } else {
            handleTableRowClick(event);
        }
    };

    useEffect(() => {
        onSelectionChanges([...selectedRowsIds]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRowsIds]);

    useEffect(() => {
        getNextDataSet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows]);

    useEffect(() => {
        let numberTypeColumnsIndexesList: number[] = [];
        columns.forEach((column: Column, index: number) => {
            if (column.numeric) {
                numberTypeColumnsIndexesList.push(index);
            }
        });
        setNumberTypeColumnsIndexes(numberTypeColumnsIndexesList);
    }, [columns]);

    return (
        <div className="data-table" id="scrollableSection">
            <InfiniteScroll
                dataLength={partialDataSet.length}
                next={getNextDataSet}
                hasMore={hasMoreDataToLoad}
                loader={<DataTableLoader />}
                scrollableTarget="scrollableSection"
            >
                <table onClick={onTableClick}>
                    <DataTableHeader columns={columns} />
                    {partialDataSet.length > 0 && <DataTableBody rows={partialDataSet} numberedColumn={numberTypeColumnsIndexes} isSelectedAll={isSelectedAll} isControlledCheckbox={isControlledCheckbox} />}
                </table>
            </InfiniteScroll>
        </div>
    );
}

export default DataTable;
