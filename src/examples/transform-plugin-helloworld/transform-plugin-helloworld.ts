import { MyPluginContext } from '../types';

export default (context: MyPluginContext) => {
    context.uiPluginLoader.registerTransformPlugin({
        location: "popout-nav-menu-item",
        loadContent: async (ctx, input) => {
            const currentMenuItems = input ?? [];
            return [
                {
                    text: "Hello World",
                    icon: "",
                    destination: "/",
                },
                ...currentMenuItems,
            ];
        },
    });
};
