import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import Generated from '../../components/Generated/Generated';
import { wrapper } from '../../providers/reduxProvider';

describe('Generated component', () => {
    it("Renders random scheme", async () => {
        render(wrapper(<Generated />))
        // await waitFor(() => screen.findByTestId('generated-colors'))
    });
})
