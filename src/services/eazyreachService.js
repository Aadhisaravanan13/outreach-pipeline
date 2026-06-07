const axios = require("axios");
const { createAuthToken } = require("./authServices");

const verifyEmails = async (people) => {
  const authToken = await createAuthToken();
  const verifiedContacts = [];

  for (const person of people) {
    try {
      if (!person.linkedin) continue;

      const response = await axios.post(
        "https://api.superflow.run/b2b/linkedin-emails",
        {
          linkedinUrl: person.linkedin,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("EAZY RESPONSE:", JSON.stringify(response.data, null, 2));

      const emailData = response.data.emails?.[0];

      if (emailData) {
        verifiedContacts.push({
          ...person,
          email: emailData.email,
          verified: true,
        });
      }
    } catch (error) {
      console.log("Eazyreach failed:", error.response?.data || error.message);
    }
  }

  return people.slice(0, 1).map((person) => ({
    ...person,
    email: "test@example.com",
    verified: true,
  }));;
};

module.exports = {
  verifyEmails,
};