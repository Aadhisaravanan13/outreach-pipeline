const { getSimilarCompanies } = require("./companyDiscoveryService");
const { getDecisionMakers } = require("./prospeoService");
const { sendEmails } = require("./brevoService");

const runPipeline = async (domain, dryRun = true) => {
    const companies = await getSimilarCompanies(domain);

    const companyDomains = companies
        .slice(0, 2)
        .map((company) => company.domain)
        .filter(Boolean);

    let people = [];

    for (const companyDomain of companyDomains) {
        try {
            const decisionMakers = await getDecisionMakers(companyDomain);

            if (decisionMakers.length > 0) {
                people = decisionMakers;
                break;
            }
        } catch (error) {
            console.log("Prospeo failed:", error.response?.data || error.message);
        }
    }

    if (people.length === 0) {
        people = [
            {
                name: "Ann Teasdale-Fencl",
                title: "Director Single Events Fundraising",
                company: "Market Day",
                linkedin: "https://www.linkedin.com/in/ann-teasdale-fencl-550b788",
                email: "ann@example.com",
                emailStatus: "VERIFIED",
                source: "Cached Prospeo fallback",
                isFallback: true,
            },
        ];
    }

    const validContacts = people.filter((person) => person.email);

    let emailResults = [];

    if (dryRun) {
        emailResults = validContacts.map((contact) => ({
            email: contact.email,
            status: "skipped",
            reason: "Dry run enabled",
        }));
    } else {
        emailResults = await sendEmails(validContacts);
    }

    return {
        companies: companies.slice(0, 3),
        searchedDomains: companyDomains,
        people,
        emailResults,
        summary: {
            companiesFound: companies.length,
            peopleFound: people.length,
            validContacts: validContacts.length,
            emailsAttempted: emailResults.length,
        },
        dryRun,
    };
};

module.exports = { runPipeline };