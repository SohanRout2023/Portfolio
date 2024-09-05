import express from 'express';
import { createTransport } from 'nodemailer';
import { urlencoded, json } from 'body-parser';
const app = express();

// Middleware
app.use(urlencoded({ extended: false }));
app.use(json());

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Set up Nodemailer transport
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',  // Your Gmail
            pass: 'your-email-password',   // Your password (use App Password if 2FA is enabled)
        }
    });

    // Email Options
    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',  // Where you receive the message
        subject: `Message from ${name}`,
        text: message
    };

    // Send Email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Email failed to send');
        } else {
            res.send('Email sent successfully');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
