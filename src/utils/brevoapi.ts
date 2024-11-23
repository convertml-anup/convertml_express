// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Import nodemailer library
import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";

// Retrieve environment variables
const brevoSenderEmail: string = process.env.BREVO_SENDER_EMAIL || '';
const brevoSmtpHost: string = process.env.BREVO_SMTP_HOST || '';
const brevoSmtpPort: number = Number(process.env.BREVO_SMTP_PORT) || 587; // default to 587 if not set
const brevoSmtpUser: string = process.env.BREVO_SMTP_USER || '';
const brevoSmtpPass: string = process.env.BREVO_SMTP_PASS || '';

// Create transporter object using SMTP relay
const transporter: Transporter = nodemailer.createTransport({
    host: brevoSmtpHost,
    port: brevoSmtpPort,
    secure: false, // false for TLS - as a boolean not string - if true TLS is used automatically
    auth: {
        user: brevoSmtpUser,
        pass: brevoSmtpPass
    }
});

// Function to send a single email using Brevo SMTP
async function sendMail(email: string, subject: string, body: string, html: string): Promise<SentMessageInfo> {
    const mailOptions: SendMailOptions = {
        from: brevoSenderEmail,
        to: email,
        subject: subject,
        text: body,
        html: html
    };

    try {
        const info: SentMessageInfo = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
}

// Function to send email to multiple recipients
async function sendMultipleEmails(emails: string[], subject: string, body: string, html: string): Promise<SentMessageInfo[]> {
    return Promise.all(emails.map(email => sendMail(email, subject, body, html)));
}

async function testSendMail(): Promise<void> {
    try {
        const result = await sendMail('abc@example.com', 'Subject', 'Body', '<h1>html</h1>');
        console.log("Result: " + JSON.stringify(result));
    } catch (error) {
        console.log("Error: " + JSON.stringify(error));
    }
}

async function testSendMultipleEmails(): Promise<void> {
    try {
        const result = await sendMultipleEmails(['abc@example.com', 'def@example.com'], 'Subject', 'Body', '<h1>html</h1>');
        console.log("Result: " + JSON.stringify(result));
    } catch (error) {
        console.log("Error: " + JSON.stringify(error));
    }
}


// Test sending a single email
// testSendMail();

// Test sending email to multiple recipients
// testSendMultipleEmails();

export { sendMail, sendMultipleEmails };
