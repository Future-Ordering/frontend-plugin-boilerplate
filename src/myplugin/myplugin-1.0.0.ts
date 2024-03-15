import { MyPluginContext } from '../types';

export default async (context: MyPluginContext) => {
    // TODO: Implement your plugin here
    console.log('Hello world');

    const token = await context.token.getUserImpersonationToken('fo:myapp');
    console.log(token);
};