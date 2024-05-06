## README.md

**Project Name**

GDone: An Effective Task Management Application

**Introduction**

This project aims to provide practical experience in designing and implementing a data storage system capable of handling large volumes and complex queries efficiently. It utilizes the combined power of SQL and NoSQL technologies.

**Prerequisites**

- Node.js (v16 or later): [https://nodejs.org/](https://nodejs.org/)
- npm (or yarn): [https://www.npmjs.com/](https://www.npmjs.com/)
- MySQL installation (for DATABASE_URL)
- MongoDB installation (for MONGODB_URL)

**Project Structure**

```
.
├── backend/
│   ├── index.js (Express.js server)
│   ├── env.example (Environment variable template)
│   ├── [other backend files]
├── frontend/
│   ├── package.json (React project dependencies)
│   ├── src/ (React application source code)
│   ├── [other frontend files]
├── README.md (This file)
```

**Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/Mehdi-Guendouz/task-manager-SQL-MongoDB.git
   ```

2. Navigate to the Backend directory:

   ```bash
   cd task-manager-SQL-MongoDB
    cd Bdd-backEnd
   ```

3. Install Back End dependencies:

   ```bash
   npm install
   ```

4. Navigate to the Backend directory:

   ```bash
   cd Bdd-front
   ```

5. Install Front end dependencies:

   ```bash
   npm install
   ```

**Environment Variables**

Create a file named `.env` in the root directory of the backend directory (/Bdd-BackEnd/.env) and add the following variables, replacing the placeholders with your actual values:

```
DATABASE_URL=mysql://username:password@host:port/database
MONGODB_URL=mongodb://username:password@host:port/database
PORT=4000
JWT_SECRET="secret_code"
```

**Starting the Application**

1. Start the backend server:

   ```bash
   npm start
   ```

2. Start the React development server:

   ```bash
   npm run dev
   ```

3. Insure that you are in the rote directory for each one of the servers to start

**Accessing the Application**

- The React application will be accessible at http://localhost:5173 by default.
- for the express server it will be accessible at http://localhost:4000 by default.

**Additional Notes**

- Replace the placeholders in the environment variables with your actual values.
- Consider using a dotenv package to manage environment variables more securely.
- For production deployment, you might need to adjust configurations and build processes.
- you may consider using nodemon for the backend if you are in dev mode
