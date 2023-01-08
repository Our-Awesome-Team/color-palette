import { render, screen } from "@testing-library/react";
import ColorCard from '../../components/ColorCard/ColorCard';
import { Color } from '../../store/favorites/favoritesTypes';
import '@testing-library/jest-dom/extend-expect';
import { wrapper } from "../../providers/reduxProvider";

const color: Color = {
    id: 123,
    hex: '#ffffff',
    tags: [{ id: 123, name: 'white' }]
}

describe('ColorCard component', () => {
    it("Renders ColorCard", async () => {
        render(wrapper(<ColorCard color={color} />));
        expect(await screen.findByText(/#/)).toBeInTheDocument();
    });
})