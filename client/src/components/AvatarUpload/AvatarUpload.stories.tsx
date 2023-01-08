import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import AvatarUpload from './AvatarUpload';
import { store } from '../../store/store';

export default {
  title: 'AvatarUpload',
  component: AvatarUpload,
} as ComponentMeta<typeof AvatarUpload>;

export const Default: ComponentStory<typeof AvatarUpload> = () => (
  <Provider store={store}>
    <AvatarUpload />
  </Provider>
);
