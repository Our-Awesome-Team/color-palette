import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Scheme } from '../../store/favorites/favoritesTypes';
import SchemeCard from './SchemeCard';

export default {
    title: 'SchemeCard',
    component: SchemeCard,
} as ComponentMeta<typeof SchemeCard>;

const scheme: Scheme = {
    id: 123,
    colors: ['418796', '532780', '416780'],
    tags: [{ id: "123", name: 'white' }]
}

export const Default: ComponentStory<typeof SchemeCard> = () => {
    return (
        <Provider store={store}>
            <SchemeCard scheme={scheme} />
        </Provider>
    );
};
