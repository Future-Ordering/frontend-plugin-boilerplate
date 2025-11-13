import { PluginContext } from '@futureordering/fo-web-plugin-types';

/**
 * Displays a horizontal scrollable list of products in the categories main area
 */
export default async (context: PluginContext) => {
    context.componentLoader.registerBlockComponent({
        location: 'categories-main',
        loadContent: async ctx => {
            const { shadow, order } = ctx;

            const css = new CSSStyleSheet();
            await css.replace(`
                  .hrow {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    overflow-x: auto;           /* enables horizontal scrolling */
                    scroll-behavior: smooth;    /* smooth programmatic scroll */
                    -webkit-overflow-scrolling: touch; /* iOS momentum */
                }

                .card {
                    flex: 0 0 260px;            /* fixed width cards */
                    min-height: 140px;
                    background: linear-gradient(135deg,#fff,#eef);
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,.08);
                    padding: 1rem;
                }

                  /* optional: visually slim down default scrollbar for modern browsers */
                .hrow::-webkit-scrollbar { height: 10px; }
                .hrow::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 6px; }
            `);
            shadow.adoptedStyleSheets.push(css);
            shadow.innerHTML = `<div>
                <div id="products-container" class="hrow">Loading products...</div>
            </div>`;
            const productsContainer = shadow.getElementById('products-container')!;

            const loadProducts = async () => {
                const currentOrder = await order.getCurrentOrder();
                if (currentOrder) {
                    productsContainer.innerHTML = '';
                    const { menu } = currentOrder;
                    for await (const product of menu.products()) {
                        const productDiv = document.createElement('div');
                        productDiv.className = 'card';
                        const header = document.createElement('h2');
                        header.innerText = product.title ?? '(Unknown title)';
                        productDiv.appendChild(header);

                        const button = document.createElement('button');
                        button.innerText = 'Add to order';
                        button.onclick = async () => {
                            await currentOrder.addItem({
                                product: product,
                            });
                        };
                        productDiv.appendChild(button);
                        productsContainer.appendChild(productDiv);
                    }
                    return true;
                }
                return false;
            };

            const orderChanged = () => {
                loadProducts();
                order.removeOrderChangedEventListener(orderChanged);
            };

            // load products immediately, but if no order is present, wait for order to be created
            // and then load products
            if (!(await loadProducts())) {
                order.addOrderChangedEventListener(orderChanged);
            }
        },
    });
};
