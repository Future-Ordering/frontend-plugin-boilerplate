import { PluginContext } from '@futureordering/fo-web-plugin-types';
import { Container, PriceResult, Product } from '@futureordering/fo-web-plugin-types/menu/menu';

/**
 * Example price calculator plugin
 * This plugin demonstrates how to create a custom price calculator
 * that modifies the prices of specific products and their configuration items.
 * Currently only supported in Composer configurator (drink configurator) 
 */
export default async function priceCalculator(context: PluginContext) {
    context.menu.registerPriceCalculator({
        getPrice: async product => {
            const isProduct = (item: Product | Container): item is Product => {
                return (item as Product).isChecked !== undefined;
            };

            if (product.menuItemId === '29370') {
                const mapProduct = (product: Product | Container): PriceResult => {
                    const result: PriceResult = {
                        menuItemId: product.menuItemId,
                        configItems: product.configItems.map(mapProduct),
                    };

                    // Caramel syrup
                    if (product.menuItemId === '20470' && isProduct(product)) {
                        const pricePerThree = 10;
                        result.unitPriceOverride = { amount: pricePerThree };
                        if (product.quantity > 0 && product.isChecked) {
                            result.totalPriceOverride = {
                                amount: pricePerThree * Math.ceil(product.quantity / 3),
                            };
                        }
                    }

                    // Cinnamon syrup
                    if (product.menuItemId === '20471') {
                        const randomPrice = Math.random() * 10;
                        result.unitPriceOverride = { amount: randomPrice };
                    }

                    // Ristretto shot
                    if (product.menuItemId === '20229') {
                        result.unitPriceOverride = { amount: 5 };
                    }

                    return result;
                };
                return mapProduct(product);
            }

            if (product.menuItemId === '181') {
                const mapProduct = (product: Product | Container): PriceResult => {
                    const result: PriceResult = {
                        menuItemId: product.menuItemId,
                        configItems: product.configItems.map(mapProduct),
                    };

                    // Extra yakiniku
                    if (product.menuItemId === '452') {
                        result.unitPriceOverride = { amount: 100 };
                    }

                    // Korean bbq sauce
                    if (product.menuItemId === '1068') {
                        result.unitPriceOverride = { amount: 5 };
                    }
                    return result;
                };
                return mapProduct(product);
            }

            // return null to 'pass' on calculating price for this product which will let other
            // calculators run or the default price be used
            return null;
        },
    });
}
