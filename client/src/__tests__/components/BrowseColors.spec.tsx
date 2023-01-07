import '@testing-library/jest-dom/extend-expect';
import BrowseColors from "../../components/BrowseColors/BrowseColors";
import { render, screen } from '@testing-library/react'

describe('BrowseColors component', () => {
    it("Renders BrowseColors", async () => {
        render(<BrowseColors title="Browse Colors" />);
        expect(await screen.findByText(/Browse Colors/i)).toBeInTheDocument();
    });
})

// {
//     "id": 123,
//     "hex": "#ffffff",
//     "tags": [{ "id": 123, "name": "white" }]
// }