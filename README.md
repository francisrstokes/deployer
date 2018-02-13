# Quick start
Install dependencies.
> npm install

Install aws cli and configure to access health-works bucket.

.env file with:

 - the variables docker-compose needs
 - TRUSTED_TOKEN which token should this app trust
 - PORT
 - NODE_ENV=production
 - AWS_DEFAULT_REGION
 - AWS_SECRET_ACCESS_KEY
 - AWS_ACCESS_KEY_ID

APIs
POST /v1.0.0/deployments
Body: { accessToken: "accessToken" }

Note: This does not handle concurrent deployments
