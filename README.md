# 🌍 Wanderlust Web Project 🚀

Excited to share my **#Wanderlust** project journey!  

A feature-rich full-stack web application inspired by Airbnb, allowing users to explore and manage travel listings with ease.

---

## 🌐 Project Overview

Wanderlust enables users to create, view, and manage travel listings, interact with other users through reviews, and explore locations using interactive maps.  
The application emphasizes secure user authentication, data integrity, and seamless user experience.

---

## 🛠️ Technologies & Packages Used

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Authentication:** Passport.js, Passport Local, Passport Local Mongoose  
- **File Storage:** Cloudinary  
- **Maps:** Mapbox  
- **Session & Cookies:** Express Session, Connect Mongo, Cookie Parser  
- **Validation:** Joi  
- **Templating:** EJS  
- **Utilities:** Dotenv, Connect Flash, Multer  

---

## 🌟 Key Features

- **User Authentication:** Login, Logout, and User Profile Management  
- **CRUD Operations:** Add, Edit, and Delete Listings  
- **Review System:** Add and Delete Reviews for Listings  
- **Account Management:** Update User Account Information and Password  
- **Security:** Password Hashing and Encryption for User Data  
- **Interactive Maps:** Leveraging Mapbox for Location Visualization  

---

## 🚧 Challenges & Solutions

- **Data Handling:** Managed large datasets efficiently with Mongoose schemas and validations.  
- **Scalability:** Structured backend routes and database queries to ensure smooth scaling.  
- **Authentication & Security:** Implemented Passport.js with hashing and session management for robust security.  

---

## 💻 Local Installation Guide

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (version 18 recommended)  
- MongoDB  
- Nodemon (installed globally)  

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bhumi-31/WanderLust.git
   cd Wanderlust
2. **Set up the database:**

   **Create a .env file in the root directory:**
   ```bash
   ATLASDB_URL="mongodb://127.0.0.1:27017/wanderlust"
3. **Set up Cloudinary:**
   **Sign up at Cloudinary and add your credentials to .env:**
   ```bash
   CLOUD_NAME=your_cloud_name
   CLOUD_API_KEY=your_api_key
   CLOUD_API_SECRET=your_api_secret
4. **Set a secret key for sessions:**
   ```bash
   SECRET=your_cloudinary_secret
5. **Install dependencies:**
   ```bash
   npm install
6. **Run the application using Nodemon:**
   ```bash
   nodemon app.js
7. **Access the project:**
   - Once the server is running, you can access the project at [http://localhost:8080](http://localhost:8080).

That's it! You have successfully installed and set up the Wanderlust web project on your local machine. If you encounter any issues during the installation process, feel free to reach out for assistance. Happy traveling! 🌍✈️

## 📦 Deployment

The project is also deployed online. Access it here:

[Live Demo Link](https://your-deployed-url.com)  
