const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()


// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  
  

// routes
app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      await transporter.verify();
      console.log("SMTP Ready");
  
      const mailOptions = {
        from: `"7xcoder Contact" <${process.env.EMAIL_USER}>`,
        to: "vertualchandan@gmail.com",
        replyTo: email,
        subject: `7xcoder Contact Form Message from ${name}`,
        html: `
          <h3>7xcoder.com Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.json({ message: "Email sent successfully 🚀" });
  
    } catch (error) {
      console.error("MAIL ERROR:", error);
      res.status(500).json({ message: "Email failed ❌" });
    }
  });
  

const port = 3000
app.listen(port, () => {
    console.log(`server running on ${port} port`)
})
