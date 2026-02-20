# 🏥 Healthcare Appointment System (MERN Stack)

A Multi-Role Healthcare Appointment System built using the MERN stack  
(MongoDB, Express.js, React.js, Node.js).

This system supports three roles:

- 👨‍💼 Admin
- 👨‍⚕️ Doctor
- 🧑 Patient

It includes JWT authentication, role-based authorization, appointment booking,
doctor availability management, and clean modular backend architecture.

---

# 🚀 Features

## 🔐 Authentication

- Patient Registration
- Login with JWT
- Logout
- Password hashing using bcrypt
- Protected routes
- Role-based access control

---

# 👤 Patient Features

- View all doctors
- View available dates for a doctor
- View available time slots for a specific date
- Book appointment
- View appointment history
- Cancel appointment (if status allows)

---

# 👨‍⚕️ Doctor Features

- Mark availability (Available / Not Available)
- View appointment requests
- Approve appointment
- Reject appointment
- Mark appointment as Completed

---

# 👨‍💼 Admin Features

- View all users
- View all appointments

---

# 📡 API Endpoints

## 🔐 Auth Routes

| Method | Endpoint |
|--------|----------|
| POST   | /api/v1/user/register |
| POST   | /api/v1/user/login |
| POST   | /api/v1/user/logout |
| GET    | /api/v1/user/profile |
| PUT    | /api/v1/user/update |

---

## 👤 Patient Routes

| Method | Endpoint |
|--------|----------|
| GET | /api/v1/patient/all |
| GET | /api/v1/patient/:doctorId/available-dates |
| GET | /api/v1/patient/:doctorId/available-slots?date=YYYY-MM-DD |
| POST | /api/v1/patient/book |
| GET | /api/v1/patient/appointments |
| PATCH | /api/v1/patient/appointments/:appointmentId/cancel |


---

## 👨‍⚕️ Doctor Routes

| Method | Endpoint |
|--------|----------|
| PUT | /api/v1/doctor/available |
| GET | /api/v1/doctor/appointments |
| PATCH | /api/v1/doctor/appointments/:appointmentId |

---

## 👨‍💼 Admin Routes

| Method | Endpoint |
|--------|----------|
| GET | /api/v1/admin/users |
| GET | /api/v1/admin/appointments |

---

# 🗄 Database Schema

## 👤 User Model

```js
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "doctor", "patient"],
    required: true
  },
  specialization: String,   // Only for doctors
  fees: String, // Only for doctors
  description: String, // Only for doctors
  avatar: {
    type: String,
    default: "default-avatar-url"
  },
  phone: String
}
```

## 👨‍⚕️ DoctorAvailability Model

```js
{
  doctor: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}
```
## 📅 Appointment Model
```js
{
  patient: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  doctor: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Completed", "Cancelled"],
    default: "Pending"
  }
}
```

## Appointment Flow

- Patient selects doctor

- Patient checks available dates

- Patient selects date → fetch available slots

- Patient books appointment → status = Pending

- Doctor approves or rejects

- Doctor marks appointment as Completed

- Patient can cancel (if pending)


## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```js
git clone <Link>
cd backend
```

### 2️⃣ Install Dependencies
```js
npm install
```
### 3️⃣ Create .env File
```
PORT=8000
DB=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run Server
```
npm run dev
```


### Server runs at:
```
http://localhost:8000
```
🔐 Security

## JWT Authentication

- Password hashing with bcrypt

- Role-based authorization middleware

- Protected routes

- Proper error handling

## 🛠 Tech Stack

- MongoDB

- Mongoose

- Express.js

- Node.js

- JWT

- bcrypt
- React js
- Redux toolkit
- react hot toast

## Future Improvements

- Pagination

- Email notifications

- Payment integration

- Dynamic slot management

- Admin dashboard analytics

- Real-time updates
