

import * as esbuild from 'esbuild';
import { readFile } from 'fs/promises';

// name of plugin
const pluginName = 'myplugin';

// build configuration
const manifest = JSON.parse(await readFile(`src/${pluginName}/manifest.json`));
const buildArgs = {
    entryPoints: [`src/myplugin/${pluginName}.ts`],
    bundle: true,
    format: 'esm',
    outfile: `dist/${pluginName}/${pluginName}-${manifest.version}.js`,
};

// build plugins
await esbuild.build(buildArgs);

// watch mode
if (process.argv.includes('--watch')) {
    const ctx = await esbuild.context(buildArgs);
    await ctx.watch();
}
