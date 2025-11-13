import { Context } from './types';

/**
 * Example Kiosk Order Status plugin
 * This plugin demonstrates how to create a custom block component
 * that displays the current order status and a new order button with a countdown timer.
 */
export default async (context: Context) => {
    let interval: ReturnType<typeof setInterval> | undefined;
    context.componentLoader.registerBlockComponent({
        location: 'kiosk-order-status',
        loadContent: async ctx => {
            const { shadow } = ctx;
            const timeout = 40;
            ctx.locationContext.newOrderCountDownTimer.stop();
            ctx.locationContext.newOrderCountDownTimer.start(timeout);
            const triggerAt = new Date(Date.now() + timeout * 1000);

            shadow.innerHTML = `
                <h1>Hello from Kiosk Order Status plugin!</h1>
                <p>Order number: 1234</p>
                <p>Time: ${new Date().toString()}</p>
                <button id="goto-new-order">Go to New Order (${timeout}s)</button>
            `;

            const button = shadow.querySelector('#goto-new-order');
            if (button) {
                button.addEventListener('click', () => {
                    ctx.locationContext.newOrderCountDownTimer.triggerDirectly();
                });
            }

            interval = setInterval(() => {
                const now = new Date();
                const secondsLeft = Math.max(
                    0,
                    Math.floor((triggerAt.getTime() - now.getTime()) / 1000)
                );
                button!.textContent = `Go to New Order (${secondsLeft}s)`;
            }, 1000);
        },
        disconnectedCallback: () => {
            if (interval) clearInterval(interval);
        },
    });
};
