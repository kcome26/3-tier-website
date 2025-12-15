# 3-Tier Website

A full-stack web application for creating and editing playlists. Built with a React frontend, Node.js/Express backend, and MySQL database.

## Features

- User authentication and playlist management
- Create, edit, and delete playlists
- Add or remove songs from playlists
- Responsive UI with React
- RESTful API backend

## Tech Stack

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Node.js, Express
- **Database:** MySQL

## Deployment

This project was deployed using two separate AWS EC2 instances:
- **Frontend:** Deployed on one EC2 instance running the React application.
- **Backend & Database:** Deployed on a second EC2 instance running the Node.js/Express backend and MySQL database.

This architecture demonstrates separation of concerns and real-world deployment practices for scalable web applications.

## Getting Started

### Prerequisites

- Node.js & npm
- MySQL

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kcome26/3-tier-website.git
   cd 3-tier-website
   ```

2. **Install dependencies:**
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - Backend:
     ```bash
     cd ../backend
     npm install
     ```

3. **Configure the database:**
   - Create a MySQL database (e.g., `playlists_db`).
   - Update database credentials in `backend/config.js` or `.env` as needed.
   - Run migrations or import schema if provided.

4. **Run the app:**
   - Start backend:
     ```bash
     npm start
     ```
   - Start frontend (in a new terminal):
     ```bash
     cd ../frontend
     npm start
     ```

5. **Access the app:**  
   Open your browser at `http://localhost:3000`

## Usage

- Register or log in
- Create new playlists
- Add or remove songs
- Edit or delete playlists
