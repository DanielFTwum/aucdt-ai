# Deployment Guide - AUCDT Web Application

## 1. Prerequisites
Before deploying, ensure you have the following installed:
*   Node.js (v18 or higher)
*   npm (v9 or higher)
*   Git

## 2. Configuration
The application uses environment variables for sensitive configuration.

### Environment Variables
Create a `.env` file in the root directory (or configure in your host dashboard) with:
```env
# Required for AI Chat
API_KEY=your_google_gemini_api_key

# Optional: Admin Password (defaults to admin123 if unset)
ADMIN_PASSWORD=your_secure_password
```

## 3. Building the Application
The application is built using Vite/React.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Development Run:**
    ```bash
    npm run dev
    ```

3.  **Production Build:**
    ```bash
    npm run build
    ```
    This generates a `dist/` directory containing the optimized static files.

## 4. Hosting Options

### Option A: Vercel (Recommended)
1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` in the project root.
3.  Set the `API_KEY` in the Vercel Project Settings > Environment Variables.

### Option B: Netlify
1.  Drag and drop the `dist/` folder into the Netlify dashboard.
2.  Or connect your Git repository and set the build command to `npm run build` and publish directory to `dist`.
3.  Add environment variables in Site Settings.

### Option C: Traditional Web Server (Apache/Nginx)
1.  Run `npm run build`.
2.  Upload the contents of `dist/` to your public HTML directory (e.g., `/var/www/html`).
3.  **Important:** Configure your server to handle SPA routing (rewrite all requests to `index.html`), although this app uses HashRouting which is compatible with static hosting out of the box.

## 5. Post-Deployment Verification
1.  Navigate to the live URL.
2.  Verify the Hero Slider loads images.
3.  Test the AI Chat Agent (requires valid API Key).
4.  Access the Admin Portal (`/#admin`) to verify routing.
