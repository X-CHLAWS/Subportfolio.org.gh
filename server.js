const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json()); // ✅ Fix "email is not defined"
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public")); // ✅ Serve static files

// ✅ Email Sending Route (Fix "email is not defined")
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ChlawsScript@gmail.com", // 🔹 Replace with your email
            pass: "Fuckyou_playsmart#14" // 🔹 Use an App Password, not your real password
        }
    });

    const mailOptions = {
        from: email,
        to: "ChlawsScript@gmail.com",
        subject: `New Message from ${name}`,
        text: `From: ${name} (${email})\n\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ success: false, error: "Failed to send email." });
    }
});

// ✅ Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
