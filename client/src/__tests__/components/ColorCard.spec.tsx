import { render, screen } from "@testing-library/react";
import ColorCard from '../../components/ColorCard/ColorCard';
import { Color } from '../../store/favorites/favoritesTypes';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux'
import { store } from '../../store/store';

type ReduxProviderProps = {
    children: JSX.Element
    reduxStore: typeof store
}

const ReduxProvider = ({ children, reduxStore }: ReduxProviderProps) => (
    <Provider store={reduxStore}>{children}</Provider>
)

const color: Color = {
    id: 123,
    hex: '#ffffff',
    tags: [{ id: 123, name: 'white' }]
}

describe('ColorCard component', () => {
    it("Renders ColorCard", async () => {
        const wrapper = (children: JSX.Element) => (
            <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
        );

        render(wrapper(<ColorCard color={color} />));
        expect(await screen.findByText(/#/)).toBeInTheDocument();
    });
})