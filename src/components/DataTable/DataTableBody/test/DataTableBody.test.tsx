/* eslint-disable testing-library/no-node-access */
import { render } from '@testing-library/react';
import { ATTRIBUTE_TYPES } from '../../constants';
import DataTableBody from '../DataTableBody';

describe('DataTableBody', () => {
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

    const renderComponent = () => {
        return render(<DataTableBody rows={mockRowData} numberedColumn={[]} selectedRowsIds={[]} />);
    };

    it('should able to render table body properly', () => {
        const container = renderComponent().container;
        expect(container.querySelectorAll('tr').length).toBe(2);
    });

    it('should render 1st td checkbox component properly', () => {
        const container = renderComponent().container;
        const firstElement = container.querySelectorAll('td')[0];
        expect(firstElement.querySelector('input')?.getAttribute('type')).toBe(ATTRIBUTE_TYPES.CHECKBOX);
    });
});
