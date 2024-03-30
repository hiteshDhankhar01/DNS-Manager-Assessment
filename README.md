# DNS-Manager-Assessment

**Backend Setup Guide**

---

**1. Prerequisites:**

- Node.js and npm installed on your system.
- MongoDB installed and running.

**2. Setting Up the Backend:**

1. Clone the backend repository from GitHub:

   ```
   git clone <backend-repository-url>
   ```

2. Navigate to the backend directory:

   ```
   cd <backend-directory>
   ```

3. Install dependencies using npm:

   ```
   npm install
   ```

4. Set up environment variables:
   
   - Create a `.env` file in the root directory.
   - Define the following variables:
   
     ```
     PORT=3001
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

5. Start the backend server:

   ```
   npm start
   ```

6. The backend server should now be running on the specified port.

---

**Frontend Setup Guide**

---

**1. Prerequisites:**

- Node.js and npm installed on your system.

**2. Setting Up the Frontend:**

1. Clone the frontend repository from GitHub:

   ```
   git clone <frontend-repository-url>
   ```

2. Navigate to the frontend directory:

   ```
   cd <frontend-directory>
   ```

3. Install dependencies using npm:

   ```
   npm install
   ```

4. Start the frontend development server:

   ```
   npm start
   ```

5. The frontend server should now be running and accessible at `http://localhost:3000`.

---

**Note:** Ensure that both the backend and frontend servers are running simultaneously for the full functionality of the DNS Manager application. Additionally, make sure the MongoDB instance is running and accessible to the backend server.

This setup guide provides the necessary steps to set up both the backend and frontend components of the DNS Manager application. If you encounter any issues during the setup process, refer to the project documentation or seek assistance from the project maintainers.