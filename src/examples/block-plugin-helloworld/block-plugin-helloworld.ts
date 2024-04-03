import { MyPluginContext } from '../types';

export default async (context: MyPluginContext) => {
    context.componentLoader.registerBlockComponent({
        location: 'start-bottom',
        loadContent: async ctx => {
            const { shadow } = ctx;

            const container = document.createElement('div');
            container.innerText = 'Hello world';
            shadow.appendChild(container);
        },
    });
};