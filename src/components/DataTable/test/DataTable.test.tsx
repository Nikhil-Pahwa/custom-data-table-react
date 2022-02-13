/* eslint-disable testing-library/no-node-access */
import { render, fireEvent, waitFor } from '@testing-library/react';
import DataTable from '../DataTable';

describe('DataTable', () => {
    const mockRowData = [
        {
            "albumId": 1,
            "id": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        },
        {
            "albumId": 1,
            "id": 2,
            "title": "reprehenderit est deserunt velit ipsam",
            "url": "https://via.placeholder.com/600/771796",
            "thumbnailUrl": "https://via.placeholder.com/150/771796"
        }
    ];

    const mockColumnData = [
        {
            'id': 'albumId',
            'label': 'Album Id',
            'numeric': true,
            'width': '70px',
        }, {
            'id': 'id',
            'label': 'Id',
            'numeric': true,
            'width': '10px',
        },
        {
            'id': 'title',
            'label': 'Title',
            'numeric': false,
            'width': '450px',
        },
        {
            'id': 'url',
            'label': 'Url',
            'numeric': false,
        }
    ];

    const rowClickSpy = jest.fn();

    const renderComponent = () => {
        return render(<DataTable columns={mockColumnData} rows={mockRowData} onRowClick={rowClickSpy} onSelectionChanges={function (selectedRowsIds: number[]): void { }} />);
    };

    it('should able to render table header properly', () => {
        const container = renderComponent().container;
        expect(container.querySelectorAll('th').length).toBe(5);
        expect(container.querySelectorAll('tbody tr').length).toBe(2);
    });

    it('should render 1st header checkbox component properly', async () => {
        const container = renderComponent().container;
        fireEvent.click(container.querySelectorAll('tbody td')[0]);
        await waitFor(() => expect(rowClickSpy).toHaveBeenCalled());
    });
});
