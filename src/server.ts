import express from 'express';
import fs from 'fs';
import path from 'path';
import https from 'https';
import cron from 'node-cron';

import { refreshCerts } from './utils/refreshCerts';
import { expressLogger as logger } from './loggers/loggers'

const app = express();
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const CERT_DIR = process.env.CERT_DIR || '';
const resolvedCertDir = path.resolve(CERT_DIR);

// Correct static file path
logger.debug(`__dirname: ${path.join(__dirname, '../../').toString()}`)
app.use('/static', express.static(path.join(__dirname, '../../', 'static')));

// Log whenever a static file is requested
app.use('/static', (req, _, next) => {
    logger.debug(`Serving static file: ${req.url}`);
    next();
});

// Function to get the script source from the asset manifest
function getScriptSrc() {
    const manifestPath = path.join(__dirname, '../../', 'asset-manifest.json');
    logger.debug(`Looking for manifest at: ${manifestPath}`);

    if (!fs.existsSync(manifestPath)) {
        logger.error(`Could not find manifest for ${manifestPath}`);
        throw new Error(`Manifest file not found at: ${manifestPath}`);
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    logger.debug(`Manifest contents: ${JSON.stringify(manifest)}`);

    // Use the absolute path '/static/' for loading the JavaScript files
    if (manifest && manifest.files && manifest.files['main.js']) {
        const mainJsPath = path.join(__dirname, '../../', manifest.files['main.js']);

        logger.debug(`Main JS file: ${manifest.files['main.js']}`);
        logger.debug(`Looking for main.js at: ${mainJsPath}`);

        // Check if the file exists
        if (!fs.existsSync(mainJsPath)) {
            logger.error(`Main.js file not found at: ${mainJsPath}`);
            throw new Error(`Main.js file not found at: ${mainJsPath}`);
        }

        // Read the main.js file contents
        const mainJsFileContent = fs.readFileSync(mainJsPath, 'utf8');
        logger.debug(`Main.js file contents (first 500 characters): ${mainJsFileContent.slice(0, 500)}`);

        return manifest.files['main.js'];
    } else {
        logger.error('Main script not found in asset-manifest.json');
        throw new Error('Main script not found in asset-manifest.json');
    }
}

// Serve the React app for any unknown routes
app.get('*', (_, res) => {
    const indexPath = path.join(__dirname, '../../', 'index.html');
    logger.debug(`Looking for index.html at: ${indexPath}`);

    if (!fs.existsSync(indexPath)) {
        logger.error(`index.html not found at: ${indexPath}`);
        throw new Error(`index.html not found at: ${indexPath}`);
    }

    let indexFile = fs.readFileSync(indexPath, 'utf8');
    logger.debug(`Original index.html contents: ${indexFile}`);

    const scriptSrc = getScriptSrc();
    logger.debug(`Script src: ${scriptSrc}`);
    indexFile = indexFile.replace('%SCRIPT_SRC%', scriptSrc);
    logger.debug(`Modified index.html contents: ${indexFile}`);
    res.send(indexFile);
});

app.get('/health', (_, res) => {
    res.status(200).send('OK');
});

app.use((req, res, next) => {
    if (req.secure) {
        return next(); // Request is already HTTPS
    }
    res.redirect(`https://${req.headers.host}${req.url}`); // Redirect HTTP to HTTPS
});

async function startHttpsServer() {
    try {
        // Refresh the certs at startup
        await refreshCerts(resolvedCertDir);

        // Load SSL certificates
        const privateKey = fs.readFileSync(path.join(resolvedCertDir, 'privkey.pem'), 'utf8');
        const certificate = fs.readFileSync(path.join(resolvedCertDir, 'fullchain.pem'), 'utf8');
        const certificateAuthority = fs.readFileSync(path.join(resolvedCertDir, 'certificate-authority/lupogreybeard-development-ca.pem'), 'utf8');

        const credentials = { key: privateKey, cert: certificate, ca: certificateAuthority };

        // Start the HTTPS server
        https.createServer(credentials, app).listen(HTTPS_PORT, () => {
            console.log(`Secure server running on port ${HTTPS_PORT}`);
            logger.info(`Secure server running on port ${HTTPS_PORT}`);
        });
    } catch (error) {
        logger.error(`Failed to start HTTPS server: ${error}`);
        console.error('Failed to start HTTPS server:', error);
    }
}

// Schedule the certificate refresh every 12 hours
cron.schedule('0 0 * * *', async () => {
    console.log('Refreshing SSL certificates...');
    await refreshCerts(CERT_DIR);
});

startHttpsServer();
