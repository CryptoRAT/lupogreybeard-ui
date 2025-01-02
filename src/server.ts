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


// Serve the React app for any unknown baseRoutes
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
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
