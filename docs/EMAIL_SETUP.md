Server Email Setup

This project supports two ways to send contact form messages:

1. Server-side Gmail (Next.js API route)
   - Environment variables required (set in Vercel Project Settings → Environment Variables):
     - `GMAIL_USER` — your Gmail address (e.g. `you@example.com`)
     - `GMAIL_APP_PASSWORD` — an App Password generated from your Google account (required if using 2FA)
   - After adding the variables, redeploy the site so the API route picks them up.

2. Client-side EmailJS fallback
   - The client uses EmailJS as a fallback when the server is not configured.
   - Confirm these values in the client code (`src/pages/contact/Contact.js`):
     - Service ID: `service_b2dmj5t`
     - Template ID: `template_u62diup`
     - User ID: `KVi8kSOugSdOnI967`
   - In the EmailJS dashboard, add your deployment origin to "Allowed origins" (e.g. `https://tosif-portfolio.vercel.app`).
   - Ensure the template variables match the keys sent from the client (`email`, `message`, `title`).

Troubleshooting

- 500 errors from `/api/message` often indicate missing server env vars or runtime exceptions. Check the deployment logs (Vercel) for the exact error message.
- EmailJS `412` responses commonly mean origin restrictions or mismatched template/service IDs; verify the dashboard settings and the IDs in the client.

If you want me to switch the server to use AWS SES as a fallback, I can implement that and add the required AWS env vars and documentation.
