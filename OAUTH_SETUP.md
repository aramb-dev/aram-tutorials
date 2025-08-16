# GitHub OAuth Configuration for Local Development

Follow these steps to configure GitHub OAuth for your local development environment. This will allow you to sign in with your GitHub account.

## 1. Create a New GitHub OAuth App

1.  Navigate to your GitHub account settings.
2.  Go to **Developer settings** > **OAuth Apps**.
3.  Click on the **"New OAuth App"** button.

## 2. Fill in the Application Details

When creating the new OAuth App, you'll need to provide the following information:

- **Application name:** Choose a descriptive name, for example, "Next.js Blog Local".
- **Homepage URL:** You can use `http://localhost:3000`.
- **Application description:** (Optional) A brief description of the application.
- **Authorization callback URL:** This is a critical step. For local development, you must use the following URL:
  ```
  http://localhost:3000/api/auth/callback/github
  ```

After filling in the details, click **"Register application"**.

## 3. Generate a Client Secret

1.  Once the application is created, you will be on the application's settings page.
2.  Click the **"Generate a new client secret"** button. GitHub will ask you to confirm your password.

## 4. Update Your Environment Variables

1.  On the same page, you will see your **"Client ID"**. Copy this value.
2.  Copy the newly generated **"Client Secret"**.

3.  Open the `.env` file in the root of this project and update the following variables with the credentials you just copied:

    ```env
    GITHUB_CLIENT_ID="YOUR_CLIENT_ID_HERE"
    GITHUB_CLIENT_SECRET="YOUR_CLIENT_SECRET_HERE"
    ```

4.  Save the `.env` file and restart your development server for the changes to take effect.

You should now be able to authenticate with your GitHub account in the application.
