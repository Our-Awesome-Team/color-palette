import Header from './Header';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>;

export const Default: ComponentStory<typeof Header> = () => {
  return (
    <Router>
      <Provider store={store}>
        <Header />
      </Provider>
    </Router>
  );
};
