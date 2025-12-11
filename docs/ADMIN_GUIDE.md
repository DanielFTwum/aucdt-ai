# Administrator Guide - AUCDT Web Application

## 1. Introduction
This document allows authorized personnel to manage the secure areas of the AsanSka University College of Design and Technology (AUCDT) web application.

## 2. Accessing the Admin Portal
The Admin Portal is hidden from the main navigation menu but is accessible via a link in the footer or by direct URL navigation.

### Steps to Access:
1.  Navigate to the homepage.
2.  Scroll to the footer (bottom of the page).
3.  Click on the **Admin** link (indicated by a Shield icon).
4.  Alternatively, append `/#admin` to the website URL (e.g., `https://aucdt.edu.gh/#admin`).

## 3. Authentication
The portal is protected by a password-based authentication system.

*   **Default Password:** `admin123` (Note: This should be changed in `constants.ts` or via environment variables in production).

### Security Features:
*   **Brute Force Protection:** To prevent unauthorized access, the system tracks failed login attempts.
*   **Lockout Policy:** If 3 incorrect passwords are entered consecutively, the login system locks for 30 seconds.
*   **Visual Indicators:** A red lock icon appears during the lockout period, and the login button becomes disabled.

## 4. Dashboard Features

### 4.1 Audit Logging
The primary function of the Admin Portal is to view the system Audit Logs. The system records critical security events locally on the device.

**Logged Events Include:**
*   `LOGIN_SUCCESS`: Successful admin authentication.
*   `LOGIN_FAILURE`: Failed password attempt.
*   `SECURITY_LOCKOUT`: System triggered a temporary ban.
*   `SECURITY_UNLOCK`: Temporary ban expired.
*   `LOGOUT`: Admin manually logged out.
*   `CLEAR_LOGS`: The audit history was purged.

### 4.2 Managing Logs
*   **Viewing:** Logs are displayed in a table format, sorted by timestamp (newest first).
*   **Clearing:** To reset the history, click the **Clear Logs** button (Trash icon). A confirmation dialog will appear to prevent accidental deletion.

## 5. Troubleshooting
*   **Locked Out?** Wait 30 seconds for the timer to expire. Refreshing the page does not reset the timer if the state is persisted (depending on implementation version).
*   **Forgot Password?** Contact the technical team. The password is defined in the source code configuration.
