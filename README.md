# 📝 Todoify Backend

The todoify-backend repository is designed to serve as the backend for the Todoify application, a task management tool that allows users to create, update, and delete their to-do items. This backend is built using Node.js and Express.js, providing a robust and scalable foundation for handling API requests, managing data storage. It includes RESTful API endpoints for CRUD operations on tasks, user authentication mechanisms, and integration with a database to persist user data and tasks. The architecture is designed to be modular and maintainable, facilitating easy updates and feature additions.
## ✨ Features

- 🗂️ **CRUD Operations for Tasks**: Create, read, update, and delete tasks efficiently.
- 🌐 **API Endpoints for Frontend Integration**: Seamless communication with the frontend application.

## API Endpoints

The backend exposes the following RESTful API routes:

| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| GET    | `/get`         | Fetch all to-do tasks   |
| POST   | `/add`         | Add a new to-do task    |
| PUT    | `/update/:id`  | Mark task as completed  |
| DELETE | `/delete/:id`  | Delete a task           |


## 🛠️ Technologies Used

- 🟢 **Node.js**
- ⚡ **Express.js**
- 🍃 **MongoDB**
- 🗃️ **Mongoose**

## 🚀 Getting Started

### ✅ Prerequisites

- 🖥️ **Node.js** installed
- 🗄️ **MongoDB** instance running

### 📥 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/geekyneha/todoify-backend.git

2. **Navigate to the project directory**:

   ```bash
   cd todify-backend

3. **Install dependencies**:

   ```bash
   npm install
4. **Set up environment variables:**
   
    Create a .env file
    PORT=5000
    MONGODB_URI=your_mongodb_uri

5. **Start the server**:


    ```bash
    npm start 
   
