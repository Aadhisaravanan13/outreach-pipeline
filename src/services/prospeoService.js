const axios = require("axios");


const getDecisionMakers = async (domain) => {
  try {
    console.log("Searching domain:", domain);
    const response = await axios.post(
      "https://api.prospeo.io/search-person",
      {
        page: 1,
        filters: {
          person_search: {
            include: [domain],
            match_mode: "SMART",
          },
        },
      },
      {
        headers: {
          "X-KEY": process.env.PROSPEO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      JSON.stringify(response.data.results[0], null, 2)
    );

    return response.data.results.slice(0, 1).map((item) => ({
      name: item.person?.full_name,
      title: item.person?.current_job_title,
      company: item.company?.name,
      linkedin: item.person?.linkedin_url,
      email: item.person?.email?.email,
      emailStatus: item.person?.email?.status,
      source: "Prospeo",
    }));

  } catch (error) {
    console.log(error.response?.data || error.message);

    if (error.response?.data?.error_code === "NO_RESULTS") {
      return [];
    }
    throw error;
  }
};

module.exports = {
  getDecisionMakers
}