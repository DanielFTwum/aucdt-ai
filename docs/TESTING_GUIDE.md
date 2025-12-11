# Testing Guide - AUCDT Web Application

## 1. Overview
This project includes a built-in "Puppeteer-Lite" testing framework. This allows you to run end-to-end integration tests directly within the browser without external Node.js dependencies.

## 2. Automated Self-Test Suite

### 2.1 Accessing the Test Suite
1.  Scroll to the footer of the application.
2.  Click the **Test Suite** link (Activity icon).
3.  Or navigate to `/#test`.

### 2.2 Running Tests
1.  Click the large green **Run Diagnostics** button.
2.  The system will automatically navigate through the app views. **Do not interact with the mouse or keyboard while the test is running.**
3.  Watch the terminal output on the right for real-time logs.

### 2.3 Test Coverage
The suite covers the following critical journeys:
*   **Homepage Sanity:** Verifies key elements (Hero, Brand text, CTAs) exist.
*   **Theme Toggle:** Switches between Dark and Light modes and verifies class application.
*   **Chat Agent:** Opens the chat, checks for the "Nkyinkyim" persona welcome message.
*   **Admin Security:** Attempts to log in with a wrong password and verifies that access is denied.

### 2.4 Interpreting Results
*   **Green Check:** Test passed successfully.
*   **Red X:** Test failed. Read the terminal log for the specific error message (e.g., "Timeout waiting for selector").

## 3. Manual Testing Checklist

If the automated suite fails or for deeper verification, perform the following:

### UI/UX
- [ ] Verify Hero Slider auto-advances every 6 seconds.
- [ ] Check horizontal scrolling on the "Programs" section.
- [ ] Ensure the Header becomes sticky when scrolling down.
- [ ] Verify Mobile Menu opens and closes correctly.

### AI Chat
- [ ] Open Chat.
- [ ] Send a message "Hello".
- [ ] Verify response is received.
- [ ] Upload an image (if available) and verify it appears in the chat bubble.

### Admin
- [ ] Go to `/#admin`.
- [ ] Enter `admin123`. Verify login.
- [ ] Click Logout. Verify redirection to login screen.
- [ ] Enter wrong password 3 times. Verify lockout timer starts.
