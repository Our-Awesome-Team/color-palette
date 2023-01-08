import { ComponentStory, ComponentMeta } from '@storybook/react';
import AvatarImage from './AvatarImage';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

export default {
    title: 'AvatarImage',
    component: AvatarImage,
} as ComponentMeta<typeof AvatarImage>;

const testImageUrl =
    'https://images.unsplash.com/photo-1630084878644-051774e104f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80';

export const WithURL: ComponentStory<typeof AvatarImage> = (
    args,
    { loaded: { file } }
) => <Provider store={store}><AvatarImage {...args} file={file} /></Provider>;

WithURL.loaders = [
    async () => ({
        file: await (async () => {
            const response = await fetch(testImageUrl);

            const blob = await response.blob();

            return new File([blob], 'image.jpg', {
                type: blob.type,
            });
        })(),
    }),
];
