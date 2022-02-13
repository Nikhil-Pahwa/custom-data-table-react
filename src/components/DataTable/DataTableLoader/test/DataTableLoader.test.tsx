/* eslint-disable testing-library/no-node-access */
import { render } from '@testing-library/react';
import DataTableLoader from '../DataTableLoader';

describe('DataTableLoader', () => {
    const renderComponent = () => {
        return render(<DataTableLoader />);
    };

    it('should able to render table loader properly', () => {
        const container = renderComponent().container;
        expect(container.querySelector('.data-table-loader')).toBeInTheDocument();
    });
});
