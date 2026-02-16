const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(express.json())

app.use(cors({
  origin: ["https://7xcoder.com"],
  methods: ["POST"]
}))

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body

    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "7xcoder Contact",
          email: "vertualchandan@gmail.com"
        },
        to: [
          { email: "chandan36024@gmail.com" }
        ],
        replyTo: {
          email: email
        },
        subject: `7xcoder Contact Form Message from ${name}`,
        htmlContent: `
          <h3>7xcoder.com Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    )

    res.json({ message: "Email sent successfully 🚀" })

  } catch (error) {
    console.error("BREVO ERROR:", error.response?.data || error.message)
    res.status(500).json({ message: "Email failed ❌" })
  }
})

const port = process.env.PORT || 10000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
