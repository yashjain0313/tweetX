# tweetX - Twitter Clone

tweetX is a full-stack web application mimicking the core functionalities of Twitter (now X), built using the MERN stack with TypeScript.

## Functionality and Features

- **Authentication:** Sign up, login (including Google OAuth), logout.
- **Posts:** Create text/image posts, view posts (all, following, user-specific, liked), delete own posts.
- **Interactions:** Like/unlike posts, comment on posts.
- **User Profiles:** View user profiles, edit own profile (details, profile/cover images), follow/unfollow users.
- **Notifications:** Receive notifications for likes and follows.
- **Suggestions:** Get suggestions for users to follow.
- **Feeds:** Separate feeds for "For You" and "Following".

## Tech Stack

**Frontend:**

- React
- TypeScript
- Vite
- Tailwind CSS + DaisyUI
- TanStack Query (React Query)
- Axios
- React Router DOM
- Firebase (for Google Authentication)
- react-hot-toast

**Backend:**

- Node.js
- Express
- MongoDB + Mongoose
- TypeScript (via JSDoc/inferred types, primarily JS)
- JWT (for authentication)
- bcryptjs (for password hashing)
- Cloudinary (for image uploads)
- Zod (for validation)
- Cors
- Cookie-parser
- Dotenv

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- MongoDB instance (local or cloud like MongoDB Atlas)
- Cloudinary account (for image storage)
- Firebase project (for Google OAuth)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd tweetX-1
    ```

2.  **Install backend dependencies:**

    ```bash
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install
    cd ..
    ```

4.  **Set up backend environment variables:**
    Create a `.env` file in the root directory (`/Users/yashjain/tweetX-1/.env`) and add the necessary variables (see Environment Variables section below).

5.  **Set up frontend environment variables:**
    Create a `.env` file in the `frontend` directory (`/Users/yashjain/tweetX-1/frontend/.env`) and add the necessary Firebase and API variables (see Environment Variables section below).

### Running the Application

1.  **Run the backend server (from the root directory):**

    ```bash
    npm run dev
    ```

    The backend will run on the port specified in your `.env` file (default: 3000).

2.  **Run the frontend development server (from the `frontend` directory):**
    ```bash
    cd frontend
    npm run dev
    ```
    The frontend will be accessible at `http://localhost:5173` (or another port if 5173 is busy).

## Environment Variables

### Backend (`/Users/yashjain/tweetX-1/.env`)

```env
PORT=3000
NODE_ENV=development # or production
MONGO_URI=<your_mongodb_connection_string>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
JWT_SECRET=<your_jwt_secret_key>
FRONTEND_URL=http://localhost:5173 # Development URL or your deployed frontend URL
```

### Frontend (`/Users/yashjain/tweetX-1/frontend/.env`)

```env
# Firebase Configuration (replace with your Firebase project details)
VITE_FIREBASE_API_KEY=<your_firebase_api_key>
VITE_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
VITE_FIREBASE_PROJECT_ID=<your_firebase_project_id>
VITE_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
VITE_FIREBASE_APP_ID=<your_firebase_app_id>
VITE_MEASUREMENT_ID=<your_firebase_measurement_id> # Optional

# API URL (for production build, otherwise uses proxy)
VITE_API_URL=<your_deployed_backend_api_url> # e.g., https://your-backend.onrender.com
```

## Deployment

- **Frontend:** Configured for deployment on Vercel (see `frontend/vercel.json`). Ensure environment variables are set in Vercel project settings.
- **Backend:** Can be deployed on platforms like Render, Heroku, or any Node.js hosting service. Ensure environment variables are set correctly on the hosting platform. Remember to set `NODE_ENV=production` and configure `FRONTEND_URL` to your deployed frontend URL.

## Dummy Credentials For Login

- UserName : `yash`
- Password : `12345678`
