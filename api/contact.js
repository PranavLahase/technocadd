// Vercel Serverless Function for Contact Form
// File: api/contact.js

const nodemailer = require('nodemailer');

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
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                message: 'Please fill in all required fields' 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: 'Please provide a valid email address' 
            });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: 'contact@technocaddapl.com',
            subject: `New Contact Form: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
            replyTo: email
        };

        await transporter.sendMail(mailOptions);

        const autoReplyOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Thank you for contacting PSP TechnoCADD',
            html: `
                <h2>Thank you for reaching out!</h2>
                <p>Dear ${name},</p>
                <p>We have received your message and will get back to you within 24-48 hours.</p>
                <br>
                <p>Best regards,</p>
                <p><strong>PSP TechnoCADD Team</strong></p>
                <p>Phone: +91 75885 37452</p>
                <p>Email: contact@technocaddapl.com</p>
            `
        };

        await transporter.sendMail(autoReplyOptions);

        return res.status(200).json({ 
            message: 'Message sent successfully!',
            success: true
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({ 
            message: 'Failed to send message. Please try again.',
            error: error.message
        });
    }
};