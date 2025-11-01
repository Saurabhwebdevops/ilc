const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json()); // parse JSON bodies
app.use(cors());

// Configure transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,              // use 465 for secure connection
  secure: true,           // true for port 465
  auth: {
    user: "saurabhverma2295@gmail.com",       // replace with your Gmail
    pass: "pofmsjvhcthkeder"          // replace with your Gmail App Password
  },
   tls: {
    rejectUnauthorized: false  // <— allow self-signed certificates
  }
});

// Route to send email
app.post("/send", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: "saurabhverma2295@gmail.com",
      to,
      subject,
      text
    });
    res.send("Request has been sent");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Failed to send email: " + err.message);
  }
});

// Start server on port 5000 (avoid conflict with React dev server)
app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});
