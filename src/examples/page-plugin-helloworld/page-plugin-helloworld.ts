import { MyPluginContext } from '../types';

export default (context: MyPluginContext) => {
    context.componentLoader.registerPageComponent({
        path: 'hello-world',
        loadContent: async ctx => {
            const { page } = ctx;

            page.setTitle('Welcome to the Hello world page');

            const h2 = document.createElement('h2');
            h2.innerText = 'Hello World';
            h2.appendChild(h2);
        },
    });
};