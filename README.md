# MapMyStay 🗺️🏨

MapMyStay is a full-stack web application for discovering, listing, and reviewing vacation rentals and local businesses. Users can register, log in, create and manage listings, upload images, and leave reviews for places they've visited.

---

## 🚀 Features

- User registration, login, and logout (Passport.js)
- Create, edit, and delete vacation rental listings
- Upload images for listings (Cloudinary + Multer)
- Leave and delete reviews on listings
- Flash messages for user feedback
- Responsive design with Bootstrap 5
- Server-side and client-side form validation
- Organized by city and country
- **Robust error handling** (client and server side)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS (templating)
- Passport.js (authentication)
- Cloudinary & Multer (image uploads)
- Joi (validation)
- Bootstrap 5
- HTML, CSS, JavaScript

---

## ⚠️ Error Handling

### Server-Side Error Handling
- **Custom ExpressError class** for consistent error responses.
- **Centralized error middleware**: All errors are caught and rendered with user-friendly messages.
- **404 Not Found**: Any undefined route returns a custom "Page Not Found" error.
- **Validation errors**: Joi is used to validate incoming data; invalid data triggers descriptive errors.
- **Authentication/Authorization errors**: Protected routes redirect unauthenticated users and show flash messages.

### Client-Side Error Handling
- **Bootstrap validation**: Forms use Bootstrap's validation classes and custom JS to prevent submission of invalid data.
- **Flash messages**: Users receive instant feedback for actions (success, error, warning).
- **Graceful UI fallback**: If a listing or review is missing, users are redirected with an error message.

---

## 📦 Installation

```bash
git clone https://github.com/mDlearner/MapMyStay.git
cd MapMyStay
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add:

```
ATLAS_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

---

## ▶️ Usage

```bash
npm start
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Folder Structure

```
MapMyStay/
├── app.js
├── models/
│   ├── listings.js
│   ├── review.js
│   └── user.js
├── routes/
│   ├── listings.js
│   ├── review.js
│   └── user.js
├── controller/
│   ├── listings.js
│   └── review.js
├── utils/
│   ├── ExpressError.js
│   ├── middleware.js
│   └── wrapAsync.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── javaScript/
│       └── formValidation.js
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── includes/
│   │   └── flash.ejs
│   ├── home.ejs
│   ├── show2.ejs
│   ├── edit.ejs
│   ├── new.ejs
│   ├── register.ejs
│   └── login.ejs
├── validateList.js
└── README.md
```

---

