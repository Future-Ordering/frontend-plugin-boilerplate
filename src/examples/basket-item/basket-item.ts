import { PluginContext } from '@futureordering/fo-web-plugin-types';

/**
 * Example basket item plugin
 * This plugin demonstrates how to create a custom block component
 * that appears in the sidebar next to each basket item.
 */
export default async (context: PluginContext) => {
    context.componentLoader.registerBlockComponent({
        shouldBeLoaded: async ctx => {
            const user = await ctx.user.getCurrentUser();
            if (!user) return false;
            if (ctx.environment.isCheckoutMode()) return false;
            return true;
        },
        location: 'sidebar-basket-item',
        loadContent: async ctx => {
            const { orderItem } = ctx.locationContext;
            const { id } = orderItem;

            const button = document.createElement('button');
            button.innerText = 'Order item ' + id;
            button.onclick = async () => {
                console.log('Clicked order item', id);
            };
            ctx.shadow.appendChild(button);
        },
    });
};
