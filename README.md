# SubSpace Automated Outreach Pipeline

## Overview

The SubSpace Automated Outreach Pipeline is a Node.js-based automation system that streamlines the outreach process by discovering similar companies, identifying decision makers, and preparing outreach campaigns from a single company domain.

The pipeline integrates company discovery, contact discovery, and email automation into a unified workflow.

---

## Live Deployment

**API Endpoint**

https://outreach-pipeline-jgz9.onrender.com/api/outreach

---

## GitHub Repository

https://github.com/Aadhisaravanan13/outreach-pipeline

---

## Features

* Discover similar companies using TheCompaniesAPI
* Identify decision makers using Prospeo
* Retrieve LinkedIn profile information
* Retrieve verified email status
* Email outreach integration using Brevo
* Dry Run mode for safe testing
* Rate-limit handling
* Fallback support for external API failures
* REST API deployment on Render

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
Brevo
      ↓
Email Outreach
```

---

## Tech Stack

### Backend

* Node.js
* Express.js

### APIs

* TheCompaniesAPI
* Prospeo
* Brevo

### Utilities

* Axios
* Dotenv

### Deployment

* Render

---

## Project Structure

```text
src
├── controllers
│   └── outreachController.js
│
├── routes
│   └── outreachRoutes.js
│
├── services
│   ├── companyDiscoveryService.js
│   ├── prospeoService.js
│   ├── brevoService.js
│   └── outreachPipelineService.js
│
└── server.js
```

---

## API Endpoint

### Start Outreach Pipeline

```http
POST /api/outreach
```

### Request Body

```json
{
  "domain": "marketday.com",
  "dryRun": true
}
```

### Parameters

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| domain    | string  | Target company domain               |
| dryRun    | boolean | Skip actual email sending when true |

---

## Sample Response

```json
{
  "success": true,
  "companies": [
    {
      "name": "Microsoft",
      "domain": "microsoft.com",
      "industry": "technology-software-and-services"
    }
  ],
  "people": [
    {
      "name": "Maya Subhadra",
      "title": "Principal RTL Design Engineer",
      "company": "Microsoft",
      "linkedin": "https://www.linkedin.com/...",
      "emailStatus": "VERIFIED"
    }
  ],
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
BREVO_SENDER_EMAIL=your_verified_email
```

---

## Installation

```bash
git clone https://github.com/Aadhisaravanan13/outreach-pipeline.git

cd outreach-pipeline

npm install

npm run dev
```

---

## Design Decisions

### Prospeo Integration

Prospeo is used to discover decision makers and retrieve professional profile information such as:

* Name
* Designation
* LinkedIn URL
* Verified email status

### Brevo Integration

Brevo is used for transactional email delivery and outreach automation.

### Dry Run Mode

Dry Run mode allows the workflow to be executed without sending actual emails, making testing safe and repeatable.

### Rate Limit Handling

External APIs may occasionally enforce rate limits. The application includes handling mechanisms to prevent failures and maintain workflow stability.

---

## Future Enhancements

* Personalized AI-generated outreach messages
* Contact deduplication
* Campaign analytics dashboard
* Retry queues for failed requests
* Database persistence
* Bulk outreach campaigns

---

## Author

Aadhi Saravanan S
