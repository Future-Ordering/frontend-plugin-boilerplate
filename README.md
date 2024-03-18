# Future Ordering frontend plugin boilerplate

## How to build your plugin

1. Install [nodejs](https://nodejs.org/)

2. **npm run dev**, starts development server. Rebuilds files on changes and starts http server on localhost:3000

3. Edit src/myplugin/myplugin.ts

4. Open Future ordering gui, navigate to /plugins and configure name "myplugin", version "1.0.0". Let config be default value.

5. To change "myplugin" to another name, edit name of folder, name of file and change variable pluginName in build.mjs. Restart npm run dev.

6. See examples directory for examples