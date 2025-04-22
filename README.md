# Task Horizon

A task management website with MongoDB Atlas integration.

## Setup
1. Install dependencies: `npm install`
2. Set up MongoDB Atlas:
   - Create a cluster and database user.
   - Configure network access (Allow Access From Anywhere for development).
   - Copy the connection string and add it to `.env` as `ATLAS_URI`.
3. Configure email:
   - Add `EMAIL_USER` and `EMAIL_PASS` (app password for Gmail) to `.env`.
4. Run locally: `npm run dev`
5. Deploy:
   - Back-end: Push to Heroku with a `Procfile` (web: node server/server.js).
   - Front-end: Deploy `/public` to Vercel.