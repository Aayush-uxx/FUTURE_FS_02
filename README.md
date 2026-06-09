# Mini CRM - Professional Lead Management System

A robust, full-stack CRM application designed for efficient lead tracking and management. Built using the **MERN** stack, it features a highly responsive UI, secure authentication, and a scalable backend architecture optimized for **Vercel** deployment.

---

## ✨ Key Features

### 🔐 Secure Authentication
*   **JWT Implementation**: Session-based security using JSON Web Tokens.
*   **Encrypted Passwords**: Robust password hashing with `bcryptjs`.
*   **Protected Routes**: Automated redirection for unauthorized users.

### 📋 Lead Management
*   **Full CRUD**: Add, view, edit, and archive leads seamlessly.
*   **Dynamic Status**: Categorize leads into `New`, `Contacted`, or `Converted` stages.
*   **Data Validation**: Built-in regex and schema validation for emails and required fields.

### 📝 Interaction Logging
*   **Note System**: Attach detailed interaction logs to any lead.
*   **Follow-up Scheduling**: Track future touchpoints with date-based follow-ups.

### 📊 Modern Dashboard
*   **Intuitive UI**: Built with `shadcn/ui` and `Radix UI` primitives.
*   **Responsive Design**: Mobile-first approach using `Tailwind CSS`.
*   **Real-time Feedback**: Instant toast notifications via `Sonner`.

---

## 🚀 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS, React Router v7 |
| **UI Components** | shadcn/ui, Radix UI, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JWT, Bcrypt.js |
| **API Client** | Axios |

## 🛠️ Installation & Setup

### 1. Backend Configuration
```bash
cd backend
npm install
```
Configure `.env`:
```ini
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 2. Frontend Configuration
```bash
cd frontend--
npm install
```
Configure `.env`:
```ini
VITE_API_URL=http://localhost:5000
```

---

## 📡 API Endpoints

### Auth
*   `POST /auth/register` - Register a new user
*   `POST /auth/login` - Authenticate and get token

### Leads
*   `GET /leads/getAllLead` - Fetch all leads
*   `POST /leads/createLead` - Add a new lead
*   `PUT /leads/updateLead/:id` - Update lead status
*   `DELETE /leads/deleteLead/:id` - Remove a lead

---

## ☁️ Deployment

This project is optimized for **Vercel**.
- **Backend**: Uses Vercel Serverless Functions via the `api/` directory.
- **Frontend**: Configured as an SPA with necessary rewrites in `vercel.json`.

---

## 📄 License

This project is licensed under the **ISC License**.
