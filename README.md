# Quick start
Install dependencies.
> npm install

Install aws cli and configure to access health-works bucket.

.env file with:

 - the variables docker-compose needs
 - TRUSTED_TOKEN which token should this app trust
 - PORT
 - NODE_ENV=production

APIs
POST /v1.0.0/deployments
Body: { accessToken: "accessToken" }

Note: This does not handle concurrent deployments
