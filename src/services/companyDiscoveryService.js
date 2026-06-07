const axios = require("axios");

const getSimilarCompanies = async (domain) => {
  try {
    const response = await axios.get(
      "https://api.thecompaniesapi.com/v2/companies/similar",
      {
        params: {
          "domains[]": domain,
          size: 5,
        },
        headers: {
          Authorization: `Bearer ${process.env.COMPANIES_API_KEY}`,
        },
      }
    );

    const companies = response.data.companies || []; 

    return companies.map((company) => ({
        name: company.about?.name,
        domain: company?.domain?.domain,
        industry: company.about?.industry
    }))
  } catch (error) {
    console.error("Company Discovery Error:", error.message);
    throw error;
  }
};

module.exports = {
  getSimilarCompanies,
};