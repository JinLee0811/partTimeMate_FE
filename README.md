# 🏆 PartTimeMon - Sydney-Based Part-Time Job Platform

## 📌 Project Overview
**PartTimeMon** is a specialized job platform that connects job seekers with **part-time and casual job opportunities** in Sydney. Designed for **students, working holiday visa holders, and temporary job seekers**, it helps users find jobs in industries such as cafés, retail, delivery, and more.

## 🚀 Features (MVP)
- **Job Listings & Filtering** – Search and filter jobs by **location, industry, and job type**.
- **Job Application System** – Users can **apply** for jobs with a resume and cover letter.
- **Employer Job Posting** – Businesses can **post, edit, and manage** job listings.
- **User Authentication** – JWT-based **login & registration** for job seekers and employers.
- **Multilingual Support** – Supporting **English & Korean**, with plans to expand.

---

## 🛠️ Tech Stack

### 🌐 Frontend (React)
- **Framework:** React.js + TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router
- **Internationalization:** react-i18next
- **API Communication:** Axios

### 🔗 Backend (NestJS)
- **Framework:** NestJS (TypeScript-based)
- **Database:** PostgreSQL (with Prisma ORM)
- **Authentication:** JWT-based user authentication
- **API Architecture:** RESTful endpoints

### ☁️ Deployment (To Be Decided)
- **Frontend:** Vercel or Netlify
- **Backend:** AWS EC2, Render, or Railway
- **Database:** Supabase or AWS RDS

---

## 📂 Folder Structure
```plaintext
project-root/
├── frontend/         # React-based frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main pages (Home, Job List, Job Detail, etc.)
│   │   ├── hooks/         # Custom hooks
│   │   ├── contexts/      # Global state/context
│   │   ├── i18n/          # Translations (English/Korean)
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Main app component
│   ├── public/            # Static assets
│   ├── package.json       # Project dependencies
│   └── tsconfig.json      # TypeScript configuration
│
├── backend/         # NestJS-based backend
│   ├── src/
│   │   ├── modules/       # Job, User, Application modules
│   │   ├── auth/          # Authentication (JWT)
│   │   ├── prisma/        # ORM schema and migrations
│   │   ├── main.ts        # Entry point
│   │   └── app.module.ts  # Main application module
│   ├── .env               # Environment variables
│   ├── package.json       # Project dependencies
│   ├── tsconfig.json      # TypeScript configuration
│   ├── README.md          # Documentation
│   └── prisma/schema.prisma  # Database schema
```

---

## 🚀 Getting Started

### **🔹 1. Clone the Repository**
```bash
git clone <REPO_URL>
cd project-root
```

### **🔹 2. Setup Frontend**
```bash
cd frontend
npm install
npm start   # Runs on http://localhost:3000
```

### **🔹 3. Setup Backend**
```bash
cd backend
npm install
npm run start:dev  # Runs on http://localhost:4000
```

### **🔹 4. Configure Environment Variables**
Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL=postgres://username:password@localhost:5432/parttimemon
JWT_SECRET=your_jwt_secret
PORT=4000
```

---

## 📌 API Endpoints (MVP)

### **🔹 User Authentication**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive a JWT token |
| `GET` | `/auth/me` | Get current user profile |

### **🔹 Job Postings**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/jobs` | Create a job post |
| `GET` | `/jobs` | Get all job listings (with filters) |
| `GET` | `/jobs/:id` | Get job details |
| `PUT` | `/jobs/:id` | Update a job post |
| `DELETE` | `/jobs/:id` | Delete a job post |

### **🔹 Job Applications**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/applications` | Apply for a job |
| `GET` | `/applications/my` | Get my job applications |
| `GET` | `/applications/job/:jobId` | Get applicants for a job |
| `PUT` | `/applications/:id/status` | Update application status |

### **🔹 Job Categories**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/categories/locations` | Get Sydney job locations |
| `GET` | `/categories/industries` | Get industries for part-time jobs |
| `GET` | `/categories/job-types` | Get job types |

---

## 👥 Team Members
| Role | Name |
|------|------|
| **Frontend Developer** | JinLee |
| **Backend Developer** | Elodie Kim |

---

## 🔥 Contributing
We welcome contributions! Follow these steps to contribute:

1. **Fork the repository**
2. **Create a new branch** (`feature/new-feature`)
3. **Commit your changes**
4. **Open a pull request**

### **Code Guidelines**
- Follow **TypeScript best practices**
- Use **ESLint & Prettier** for code formatting
- Write **meaningful commit messages**

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 📩 Contact
For any inquiries or suggestions, feel free to reach out:

- **JinLee** - [jinlee@example.com](mailto:jinlee@example.com)
- **Elodie Kim** - [elodie@example.com](mailto:elodie@example.com)

---
