import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ColorCard from './ColorCard';
import { Color } from '../../store/favorites/favoritesTypes';

export default {
    title: 'ColorCard',
    component: ColorCard,
} as ComponentMeta<typeof ColorCard>;

const color: Color = {
    id: 123,
    hex: '3355dd',
    tags: [{ id: 123, name: 'white' }]
}

export const Default: ComponentStory<typeof ColorCard> = () => {
    return (
        <Provider store={store}>
            <ColorCard color={color} />
        </Provider>
    );
};
