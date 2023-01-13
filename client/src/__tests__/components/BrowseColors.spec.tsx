import BrowseColors from "../../components/BrowseColors/BrowseColors";
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';

describe('BrowseColors component', () => {
    it("Renders BrowseColors", async () => {
        render(<BrowseColors title="Browse Colors" />)
        expect(await screen.findByText(/Browse Colors/i)).toBeInTheDocument()
    });
})
