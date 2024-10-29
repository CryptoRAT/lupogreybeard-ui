import { CracoAliasPlugin } from 'react-app-alias';

export default {
    plugins: [
        {
            plugin: CracoAliasPlugin,
            options: {
                source: 'tsconfig',
                tsConfigPath: './tsconfig.paths.json'
            }
        }
    ]
};
