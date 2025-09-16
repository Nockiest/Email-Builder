const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors'); // <-- Add this line

dotenv.config();

const app = express();
app.use(cors()); // <-- Add this line
// Allow only your frontend origin (recommended for production)
// app.use(cors({
//     origin: 'http://localhost:5500', // Change this to your frontend's URL/port
//     methods: ['GET', 'POST'],
//     credentials: false
// }));

app.use(express.json());

async function sendEmail(to_email, from_email, subject, message) {
    console.log(`Preparing to send email to ${to_email} with subject "${subject}" and message "${message}"`);
    const EMAIL = process.env.EMAIL;
    const PASSWORD = process.env.PASSWORD;
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: EMAIL,
            to: to_email,
            subject: subject,
            text: message,
            replyTo: from_email // <-- Add recipient as reply-to
        });

        console.log("Email sent successfully.");
        return { success: true }; // <-- Return success on success
    } catch (error) {
        console.error(`Error sending email: ${error}`);
        throw error;
    }
}

// New endpoint to send email
app.post('/send-email', async (req, res) => {
    const { to_email, subject, message, from_email } = req.body;
    console.log(req.body);
    if (!to_email || !subject || !message || !from_email)  {
        return res.status(400).json({ error: 'Missing required fields.' });
    }
    try {
        await sendEmail(to_email, subject, message);
        res.json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
