# 🛍️ FlockShop - Shared Wishlist App

A full-stack collaborative wishlist platform where users can create and manage shared product wishlists with friends, family, or teams. Designed for real-time planning and social shopping experiences.

---

## 🌐 Live Demo (Optional)

> _Add your deployed link here if hosted on Vercel / Netlify / Render / Cyclic etc._

---

## 📸 Screenshots

> _Include screenshots or a Loom/video demo here_

---

## 🚀 Features

### 👥 User Auth
- 🔐 Sign Up & Login with secure form validation
- 🔁 Persistent login using `localStorage`

### 📋 Wishlists
- ✅ Create a new wishlist
- 🧾 View all wishlists created by you
- 📝 See who created the list

### 🛍️ Products
- ➕ Add/edit/delete items in a wishlist
- 🖼️ Product image, price, and name
- 🙋 Shows who added each product

### 💬 Social Interactions *(Bonus)*
- ❤️ Emoji reactions to products
- 💭 Add comments below each item
- 📡 Real-time refresh after new activity

### 🎯 UI/UX
- ✨ Stylish interface using **TailwindCSS**
- 🔤 Clean font styling with **Poppins**
- 📱 Mobile-first responsive design

---

## 🧑‍💻 Tech Stack

| Layer     | Tech Used                             |
|-----------|----------------------------------------|
| Frontend  | React.js + Tailwind CSS                |
| Routing   | React Router DOM                       |
| State     | React Context API                      |
| Backend   | Node.js + Express                      |
| Database  | MongoDB Atlas                          |
| Realtime  | Axios polling (Firebase optional)      |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flockshop.git
cd flockshop
```
### 2. Frontend Setup
```bash
  cd client
  npm install
  npm start
```

### 3. Backend Setup
```bash
  cd server
  npm install
  npm start
```

### 4. Folder Structure
client/
  └── src/
      ├── components/
      ├── context/
      ├── pages/
      ├── App.js
server/
  ├── routes/
  ├── models/
  ├── index.js


### 📈 How Would I Scale This?
If building this for production:
🔐 Add JWT-based auth + role-based access
🌐 Use Firebase Realtime DB or Socket.IO for true live collaboration
📦 Optimize DB design: split items into a separate collection for scaling
📱 Add native mobile app support via React Native or Flutter
🧪 Add tests (Jest for frontend, Supertest/Mocha for backend)
🧩 Improve error handling, validation & accessibility


