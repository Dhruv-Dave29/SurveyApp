# Survey App

## Installation and Running the Application

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)  
- npm or yarn  
- [Supabase](https://supabase.com/) account  

---

### Setup Instructions

#### 1. Clone the repository
```bash
git clone <repository-url>
cd survey-app
```

#### 2. Install frontend dependencies
```bash
cd surveyapp-fe
npm install
```

#### 3. Install backend dependencies
```bash
cd ../surveyapp-be
npm install
```

---

### 4. Environment Variables Setup

#### Frontend (`surveyapp-fe/.env`)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Backend (`surveyapp-be/.env`)
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

---

### 5. Running the Application

#### Start the backend server (Terminal 1)
```bash
cd surveyappbe
node server.js
```

#### Start the frontend development server (Terminal 2)
```bash
cd surveyappfe
npm run dev
```

---

### 6. Access the Application
Open your browser and navigate to:  
 [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)
