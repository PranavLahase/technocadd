// Vercel Serverless Function for Brochure Download
// File: api/download.js

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const brochurePath = path.join(process.cwd(), 'assets', 'PSP-TechnoCADD-Brochure.pdf');

        if (!fs.existsSync(brochurePath)) {
            return res.status(404).json({ 
                message: 'Brochure file not found' 
            });
        }

        const fileBuffer = fs.readFileSync(brochurePath);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="PSP-TechnoCADD-Brochure.pdf"');
        res.setHeader('Content-Length', fileBuffer.length);

        return res.status(200).send(fileBuffer);

    } catch (error) {
        console.error('Download error:', error);
        return res.status(500).json({ 
            message: 'Failed to download brochure.',
            error: error.message
        });
    }
};