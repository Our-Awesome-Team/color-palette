import '@testing-library/jest-dom/extend-expect';
import { render, screen } from "@testing-library/react";
import BrowseColors from "../../components/BrowseColors/BrowseColors";


test("Renders BrowseColors", async () => {
    render(<BrowseColors title="Browse Colors" />);
    expect(await screen.findByText(/Browse Colors/i)).toBeInTheDocument();
});