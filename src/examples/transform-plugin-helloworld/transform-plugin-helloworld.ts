import { MyPluginContext } from '../types';

export default (context: MyPluginContext) => {
    context.componentLoader.registerTransformComponent({
        location: "popout-nav-menu-item",
        loadContent: async (ctx, input) => {
            const currentMenuItems = input ?? [];
            return [
                {
                    text: "Hello World",
                    icon: "user",
                    destination: "/",
                },
                ...currentMenuItems,
            ];
        },
    });
};
