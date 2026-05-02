"# sabrgam-collage" 


# Sargam College Run Guide

Follow these steps to get the full-stack Sargam College website up and running.

## 1. Prerequisites
- **Node.js**: Installed on your system.
- **MongoDB**: A running MongoDB instance (Local or Atlas).
- **OpenAI API Key**: Required for AI features.

## 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the `.env` file with your credentials:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: Any random string.
   - `OPENAI_API_KEY`: Your OpenAI key.
4. Start the server:
   ```bash
   npm run dev
   ```

## 3. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application at `http://localhost:5173`.

## 4. Default Accounts
- **Student**: Register via the signup page.
- **Admin**: Update a user's role to `admin` directly in the MongoDB database to access the Admin Panel.

## 5. Directory Structure
- `/backend`: Node.js/Express API.
- `/frontend`: React/Vite/Tailwind UI.
