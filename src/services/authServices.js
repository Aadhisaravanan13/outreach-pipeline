const axios = require("axios");

const createAuthToken = async () => {
    const response = await axios.post(
        "https://api.superflow.run/b2b/createAuthToken/",
        {
            clientId: process.env.EAZYREACH_CLIENT_ID,
            clientSecret: process.env.EAZYREACH_SECRET_KEY,
        }
    );

    console.log("AUTH RESPONSE KEYS:", Object.keys(response.data));
    return response.data.auth_token || response.data.authToken || response.data.token;
};

module.exports = {
    createAuthToken,
};