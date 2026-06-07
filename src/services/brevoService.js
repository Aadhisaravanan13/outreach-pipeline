const axios = require("axios");

const sendEmails = async (contacts) => {
  const results = [];

  for (const contact of contacts) {
    try {
      if (!contact.email) continue;

      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: process.env.BREVO_SENDER_NAME,
            email: process.env.BREVO_SENDER_EMAIL,
          },
          to: [
            {
              email: contact.email,
              name: contact.name,
            },
          ],
          subject: `Quick question for ${contact.company}`,
          htmlContent: `
            <p>Hi ${contact.name},</p>
            <p>I noticed your work at ${contact.company} and wanted to quickly connect.</p>
            <p>Would love to explore if there is a possible collaboration opportunity.</p>
            <p>Best,<br/>Aadhi</p>
          `,
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      results.push({
        email: contact.email,
        status: "sent",
        messageId: response.data.messageId,
      });
    } catch (error) {
      results.push({
        email: contact.email,
        status: "failed",
        error: error.response?.data || error.message,
      });
    }
  }

  return results;
};

module.exports = { sendEmails };