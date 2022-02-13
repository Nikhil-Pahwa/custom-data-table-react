/* eslint-disable testing-library/no-node-access */
import { render } from '@testing-library/react';
import { ATTRIBUTE_TYPES } from '../../constants';
import DataTableHeader from '../DataTableHeader';

describe('DataTableHeader', () => {
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

    const renderComponent = () => {
        return render(<DataTableHeader columns={mockColumnData} />);
    };

    it('should able to render table header properly', () => {
        const container = renderComponent().container;
        expect(container.querySelectorAll('th').length).toBe(5);
    });

    it('should render 1st header checkbox component properly', () => {
        const container = renderComponent().container;
        const firstHeaderElement = container.querySelectorAll('th')[0];
        expect(firstHeaderElement.querySelector('input')?.getAttribute('type')).toBe(ATTRIBUTE_TYPES.CHECKBOX);
    });

    it('should render 1st header checkbox component with default state as unchecked', () => {
        const container = renderComponent().container;
        const firstHeaderElement = container.querySelectorAll('th')[0];
        expect(firstHeaderElement.querySelector('input')?.checked).toBe(false);
    });
});
