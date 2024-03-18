import { MyPluginContext } from '../types';

export default async (context: MyPluginContext) => {
    context.uiPluginLoader.registerBlockPlugin({
        location: 'start-bottom',
        loadContent: async blockPluginContext => {
            const { shadow } = blockPluginContext;

            const container = document.createElement('div');
            container.innerText = 'Hello world';
            shadow.appendChild(container);
        },
    });
};