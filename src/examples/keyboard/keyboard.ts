import { Keyboard } from '@futureordering/fo-web-plugin-types/dialog/dialog';
import { Context } from './types';

/**
 * Example keyboard plugin
 * This plugin demonstrates how to create a custom on-screen keyboard
 * for guest name entry during checkout.
 */
export default async (context: Context) => {
    let keyboard: Keyboard | undefined;

    context.componentLoader.registerPageComponent({
        path: 'guest-name-entry',
        location: {
            name: 'checkout', // page will be injected in checkout flow
            index: 0,
        },
        loadContent: async ctx => {
            const { shadow, dialog } = ctx;

            const stylesheet = new CSSStyleSheet();
            await stylesheet.replace(css);
            shadow.adoptedStyleSheets.push(stylesheet);
            shadow.innerHTML = `
                <h1>Enter your name</h1>
                <input type="text" id="guest-name-input" />
            `;
            const input = shadow.getElementById('guest-name-input') as HTMLInputElement;

            requestAnimationFrame(async () => {
                keyboard = await dialog.showOnScreenKeyboard({
                    input: input,
                    locale: 'english',
                    onKeyPress: button => {
                        if (button === '{enter}') {
                            keyboard!.close();
                        }
                    },
                    formatLayoutConfig: layoutConfig => {
                        const rows = layoutConfig['shift'];
                        if (!rows) return layoutConfig;
                        const newRows = rows
                            .filter(row => !row.includes('{123}')) // Remove the {123} row
                            .map(row => row.replace('{shift}', '-')); // Replace {shift} with '-'
                        return {
                            ...layoutConfig,
                            shift: newRows,
                        };
                    },
                    // allow only letters for all languages + dash
                    // https://stackoverflow.com/questions/15861088/regex-to-match-only-language-chars-all-language
                    inputPattern: /^[\p{L}-]{0,12}$/u,
                });

                const { containerElement: keyboardContainer } = keyboard!;
                const namePosition = input.getBoundingClientRect();

                // position the keyboard below the input field
                keyboardContainer.style.position = 'absolute';
                const keyboardWidth = 1200; // Fixed width for the keyboard container
                keyboardContainer.style.left = `${namePosition.left - (keyboardWidth - namePosition.width) / 2}px`;
                keyboardContainer.style.top = namePosition.bottom + 45 + 'px';
                keyboardContainer.style.width = keyboardWidth + 'px';
            });
        },
        disconnectedCallback() {
            keyboard?.close();
        },
    });
};

const css = `
    h1 {
        font-size: 48px;
        text-align: center;
        margin-bottom: 40px;
    }
    #guest-name-input {
        font-size: 36px;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        text-align: center;
    }
`;
