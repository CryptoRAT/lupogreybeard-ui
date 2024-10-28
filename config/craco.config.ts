import path from 'path';
import { CracoConfig } from '@craco/types';

const cracoConfig: CracoConfig = {
    webpack: {
        alias: {
            '@css': path.resolve(__dirname, '../src/css'),
            '@components': path.resolve(__dirname, '../src/components'),
            '@utils': path.resolve(__dirname, '../src/utils'),
            '@config': path.resolve(__dirname, '../config'),
            '@routes': path.resolve(__dirname, '../src/routes'),
        },
    },
    eslint: {
        enable: false,  // Disable ESLint during build
    },
};

export default cracoConfig;
