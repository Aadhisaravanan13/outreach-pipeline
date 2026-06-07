# SubSpace Automated Outreach Pipeline

## Overview

This project automates the process of discovering similar companies, identifying relevant decision-makers, and preparing personalized outreach campaigns.

The pipeline integrates company discovery, contact discovery, and email automation into a single workflow.

---

## Features

* Discover similar companies using TheCompaniesAPI
* Identify decision-makers using Prospeo
* Retrieve LinkedIn profile information
* Prepare outreach contact lists
* Send outreach emails using Brevo
* Support dry-run mode for safe testing
* Graceful fallback handling for external API rate limits

---

## Workflow

```text
Input Domain
      ↓
TheCompaniesAPI
      ↓
Similar Companies
      ↓
Prospeo
      ↓
Decision Makers
      ↓
Contact Discovery
      ↓
Brevo
      ↓
Email Outreach
```

---

## Tech Stack

* Node.js
* Express.js
* Axios
* TheCompaniesAPI
* Prospeo API
* Brevo API

---

## API Endpoint

### Start Outreach Pipeline

**POST**

```http
/api/outreach
```

### Request Body

```json
{
  "domain": "subspace.com",
  "dryRun": true
}
```

### Parameters

| Field  | Type    | Description                         |
| ------ | ------- | ----------------------------------- |
| domain | string  | Target company domain               |
| dryRun | boolean | Skip actual email sending when true |

---

## Sample Response

```json
{
  "success": true,
  "companies": [],
  "searchedDomains": [],
  "people": [],
  "emailResults": [],
  "summary": {},
  "dryRun": true
}
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

COMPANIES_API_KEY=your_companies_api_key

PROSPEO_API_KEY=your_prospeo_api_key

BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_NAME=AadhiDev
BREVO_SENDER_EMAIL=your_verified_sender_email
```

---

## Installation

```bash
git clone <repository-url>

cd project

npm install

npm run dev
```

---

## Design Decisions

### Prospeo Integration

Prospeo is used to discover decision-makers and retrieve professional profile information.

### Brevo Integration

Brevo is used to send outreach emails through its transactional email API.

### Dry Run Support

To prevent accidental email delivery during testing, the pipeline supports a dry-run mode that skips actual email sending while preserving the workflow.

### Rate Limit Handling

External APIs may occasionally return rate-limit errors. To ensure uninterrupted testing and demonstration, fallback contact structure is used only when external API rate limits prevent live retrieval.

---

## Future Improvements

* Real-time email verification
* Personalized AI-generated outreach content
* Contact deduplication
* Retry queues for failed API calls
* Campaign analytics and tracking
* Database persistence

---

## Author

Aadhi Saravanan
