import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { expressLogger as logger } from "../loggers/loggers";

// Set up the S3 client
const s3 = new AWS.S3();
const BUCKET_NAME = 'lupogreybeard/private/letsencrypt/live/lupogreybeard.com';

// Function to download a file from S3 and save it locally
async function downloadS3ObjectToFile(key: string, dest: string): Promise<void> {
    const params = { Bucket: BUCKET_NAME, Key: key };
    const data = await s3.getObject(params).promise();
    fs.writeFileSync(dest, data.Body as Buffer);
    console.log(`Downloaded ${key} to ${dest}`);
}

// Function to refresh certificates
export async function refreshCerts(certDir: string) {
    try {
        // Check if certDir is defined
        if (!certDir || certDir.trim() === '') {
            logger.error('Certificate directory (CERT_DIR) is not defined or is empty.')
            throw new Error('Certificate directory (CERT_DIR) is not defined or is empty.');
        }
        // Check if running in production
        if (process.env.NODE_ENV !== 'production') {
            console.log('Skipping certificate download: Not running in production.');
            return;
        }
        // Define certificate file paths
        const keyFile = path.join(certDir, 'privkey.pem');
        const certFile = path.join(certDir, 'fullchain.pem');

        // Download and save certificates from S3
        await downloadS3ObjectToFile('privkey.pem', keyFile);
        await downloadS3ObjectToFile('fullchain.pem', certFile);

        console.log('Certificates refreshed successfully');
    } catch (err) {
        console.error('Error refreshing certificates:', err);
    }
}
