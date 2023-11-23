import { MyPluginContext } from "../../types";

export default (context: MyPluginContext) => {
    context.uiPluginLoader.registerPagePlugin({
        path: 'hello-world',
        loadContent: async pagePluginContext => {
            const { page } = pagePluginContext;

            page.setTitle('Welcome to the Hello world page');

            const h2 = document.createElement('h2');
            h2.innerText = 'Hello World';
            h2.appendChild(h2);
        },
    });
};