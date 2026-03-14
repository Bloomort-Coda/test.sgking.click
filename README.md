# React App Deployment to Hostinger

This project is configured to automatically deploy to `test1.sgking.click` via GitHub Actions.

## Deployment Setup

1.  **GitHub Secrets:** Ensure the following secrets are added to your GitHub repository:
    *   `FTP_SERVER`
    *   `FTP_USERNAME`
    *   `FTP_PASSWORD`

2.  **Workflow:** The deployment is handled by `.github/workflows/deploy.yml`.
3.  **Routing:** The `.htaccess` file in the `public` folder handles React SPA routing on Hostinger.

## Local Development

```bash
npm install
npm run dev
```
