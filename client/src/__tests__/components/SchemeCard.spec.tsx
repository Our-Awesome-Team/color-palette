import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { wrapper } from "../../providers/reduxProvider";
import { Scheme } from "../../store/favorites/favoritesTypes";
import SchemeCard from "../../components/SchemeCard/SchemeCard";

const scheme: Scheme = {
    id: 123,
    colors: ['#ffffff', '#ffffff', '#ffffff'],
    tags: [{ id: "123", name: 'white' }]
}

describe('ColorCard component', () => {
    it("Renders ColorCard", async () => {
        render(wrapper(<SchemeCard scheme={scheme} />));
        expect(await screen.findAllByText(/#/)).toHaveLength(3);
    });
})