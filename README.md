# 🎬 GeekBuster Movies
GeekBuster Movies is a full-stack movie discovery and management application inspired by the nostalgic Blockbuster experience.
Browse trending, popular, and top-rated films, search for specific titles, view details, and manage your own favorites list — all with a secure login system.
---

## 🚀 Features
## **Frontend**
- Browse movies by category (Popular, Top Rated, Now Playing, Upcoming).
- Search movies by title using the TMDb API.
- View detailed information including synopsis, poster, rating, and trailers.
- Add or remove movies from your personal favorites list.
- Responsive design for desktop and mobile.
## **Backend**
- User authentication with hashed passwords and JWT tokens.
- CRUD operations for user favorites.
- RESTful API with Flask and SQLAlchemy.
- CORS enabled for frontend–backend communication.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- React Router DOM
- Context API + useReducer
- CSS Modules & global variables for theme styling

**Backend:**
- Python 3 + Flask
- SQLAlchemy ORM
- Flask-Migrate
- Flask-JWT-Extended
- PostgreSQL / SQLite

**External API:**
- [TMDb API](https://www.themoviedb.org/documentation/api)

---

## ⚙️ Installation

## **Backend Setup**
> Recommended: Install backend first
> Requirements: Python 3.10, Pipenv, Database engine (PostgreSQL recommended)

## Install backend dependencies
pipenv install

## Create .env file
cp .env.example .env
## Add your DATABASE_URL and JWT_SECRET_KEY

## Run migrations
pipenv run migrate
pipenv run upgrade

## Start backend server
pipenv run start
Database URLs Examples
Engine	Example URL
SQLite	sqlite:////test.db
MySQL	mysql://username:password@localhost:port/example
Postgres	postgres://username:password@localhost:5432/example
Frontend Setup
Requirements: Node.js v20

## Install frontend dependencies
npm install

## Create .env file
cp .env.example .env

**Add your VITE_BACKEND_URL and VITE_TMDB_API_KEY**

## Start frontend
npm run start

---

## 📡 API Endpoints
### **Auth**
| Method | Endpoint  | Description |
|--------|-----------|-------------|
| POST   | /signup   | Create a new user |
| POST   | /login    | Authenticate user & return JWT |

### **Favorites**
| Method | Endpoint        | Description |
|--------|-----------------|-------------|
| GET    | /favorites      | List all user favorites |
| POST   | /favorites      | Add a movie to favorites |
| DELETE | /favorites/<id> | Remove a movie from favorites |

---

## 🗂️ Project Structure
```
/src
  /api
    models.py      # Database models
    routes.py      # API endpoints
  /front
    /components    # Reusable components
    /pages         # Page views
    /styles        # CSS styles
    store.js       # Global state reducer
```
---

## 🔑 Environment Variables

## **Backend**
- FLASK_APP=src/app.py
- DATABASE_URL=sqlite:////test.db
- JWT_SECRET_KEY=your_secret_key

## **Frontend**
- VITE_BACKEND_URL=http://localhost:3001/api
- VITE_TMDB_API_KEY=your_tmdb_api_key

--- 

## 🎯 Future Improvements
- User profiles with avatars and bios.
- Watchlist and “watched” tracking.
- Advanced search filters (genre, release year).
- User-submitted reviews and ratings.

---

### 👨‍💻 Contributors
- David Leon
- William Beach
- Kevin Sanches

---

**Built as part of the 4Geeks Academy Full Stack Developer Bootcamp (https://4geeks.com).**

---

## 📜 License
MIT License
