# Future Ordering frontend plugin boilerplate

## How to build your plugin

1. Install [nodejs](https://nodejs.org/), it is recommended to use chrome browser

2. **npm run dev**, starts development server. Rebuilds files on changes and starts http server on http://localhost:3000. To instead use https see below.

3. Edit src/myplugin/myplugin.ts

4. Open Future ordering gui, navigate to /plugins and configure name "myplugin", version "1.0.0". Let config be default value.

5. To change "myplugin" to another name, edit name of folder, name of file and change variable pluginName in build.mjs. Restart npm run dev.

6. See examples directory for examples

7. **npm run build**, to build once and include manifest.json in dist.

## Serve plugins over HTTPS

Some browser doesn't allow serving files from http. To enable HTTPS:

1. Install makecert

    Mac:
    brew install mkcert

    Windows:
    https://learn.microsoft.com/en-us/windows/win32/seccrypto/makecert

2. Make certificate

    mkcert -install localhost
    
    \# The certificate is at "./localhost.pem" and the key at "./localhost-key.pem"

3. Start dev server

    npm run dev-https