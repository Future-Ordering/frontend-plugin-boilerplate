

import * as esbuild from 'esbuild';
import { readFile, writeFile } from 'fs/promises';

// name of plugin
const pluginName = 'myplugin';

// build configuration
const manifest = JSON.parse(await readFile(`src/${pluginName}/manifest.json`));
const buildArgs = {
    entryPoints: [`src/myplugin/${pluginName}.ts`],
    bundle: true,
    format: 'esm',
    outfile: `dist/${pluginName}/${manifest.version}/${pluginName}.js`,
};

if (process.argv.includes('--watch')) {
    // watch mode
    const ctx = await esbuild.context(buildArgs);
    await ctx.watch();
} else {
    // build plugins
    await esbuild.build(buildArgs);
}

if (process.argv.includes('--include-manifest')) {
    await writeFile(`dist/${pluginName}/${manifest.version}/manifest.json`, JSON.stringify(manifest, null, 2));
}