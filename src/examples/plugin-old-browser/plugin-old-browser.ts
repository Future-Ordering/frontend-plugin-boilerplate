import { PluginContext } from '@futureordering/fo-web-plugin-types';

// Important:
// - Change build.mjs, add "target": "edge18" to esbuild buildArgs when building non ESM plugins
// - Observe "esm": false in manifest.json

async function main(context: PluginContext) {
    console.log('This is an old browser plugin example');
};

(window as any).plugins['plugin-old-browser'] = main;