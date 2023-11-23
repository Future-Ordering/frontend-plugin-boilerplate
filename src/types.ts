import { PluginContext } from "@futureordering/fo-web-plugin-types";

export type MyPluginContext = PluginContext & {
    config: {
        env?: 'dev' | 'test' | 'prod';
    };
};