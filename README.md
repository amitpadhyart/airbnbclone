# 🏠 Wanderlust — Airbnb Clone

A full-stack Airbnb clone built with Node.js, Express, and MongoDB that replicates core features of the popular vacation rental platform — including property listings, reviews, user authentication, and image uploads.

## 🌐 Live Demo

👉 [https://airbnbcloneproject-e0lz.onrender.com/listings](https://airbnbcloneproject-e0lz.onrender.com/listings)

> Hosted on [Render](https://render.com)

---

## ✨ Features

- 🔐 User authentication (sign up / log in / log out)
- 🏡 Create, edit, and delete property listings
- 📸 Image upload via Cloudinary
- ⭐ Leave and delete reviews on listings
- 🔒 Authorization — only owners can edit/delete their listings
- ⚠️ Flash messages for user feedback
- 🛡️ Error handling with custom error classes
- 📱 Responsive UI with EJS templating

---

## 🛠️ Tech Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Backend      | Node.js, Express.js     |
| Database     | MongoDB, Mongoose       |
| Templating   | EJS                     |
| Auth         | Passport.js             |
| Image Upload | Cloudinary              |
| Styling      | CSS (custom stylesheet) |
| Hosting      | Render                  |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amitpadhyart/airbnbclone.git
   cd airbnbclone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. **(Optional) Seed the database**
   ```bash
   node init/index.js
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📁 Project Structure

```
airbnbclone/
├── controllers/
│   ├── listing.js        # Listing logic
│   ├── review.js         # Review logic
│   └── user.js           # User auth logic
├── init/
│   ├── data.js           # Seed data
│   └── index.js          # DB seeding script
├── models/
│   ├── listing.js        # Listing schema
│   ├── review.js         # Review schema
│   └── user.js           # User schema
├── public/
│   ├── css/style.css     # Custom styles
│   └── js/script.js      # Client-side JS
├── routes/
│   ├── listing.js        # Listing routes
│   ├── review.js         # Review routes
│   └── user.js           # User routes
├── UTILS/
│   ├── ExpressError.js   # Custom error class
│   └── wrapasync.js      # Async error wrapper
├── views/
│   ├── includes/
│   │   ├── flash.ejs     # Flash messages
│   │   ├── footer.ejs    # Footer partial
│   │   └── navbar.ejs    # Navbar partial
│   ├── layouts/
│   │   └── boilerplate.ejs  # Base layout
│   ├── listings/
│   │   ├── index.ejs     # All listings
│   │   ├── show.ejs      # Single listing
│   │   ├── new.ejs       # Create listing
│   │   └── edit.ejs      # Edit listing
│   └── user/
│       ├── login.ejs     # Login page
│       └── signup.ejs    # Signup page
├── app.js                # Main app entry point
├── cloudconfig.js        # Cloudinary config
├── middleware.js         # Custom middleware
├── schema.js             # Joi validation schemas
├── .env                  # Environment variables
└── index.html            # Static HTML
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Amit Padhya**  
GitHub: [@amitpadhyart](https://github.com/amitpadhyart)
