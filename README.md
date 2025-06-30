
# Truly IAS Blog Task

A full-stack blog application built as part of the Truly IAS internship task. The platform allows admin users to create, edit, view, and delete rich-text blog posts. Each post is stored in MongoDB and accessible through SEO-friendly URLs.

## 🔗 Live Demo

[Visit Live Site](https://truly-ias-blog-task.vercel.app/)

## 📁 GitHub Repository

[GitHub Repo](https://github.com/kuruvapavani/truly-ias-blog-task)

## ✨ Features

- Admin Dashboard for managing blog posts (CRUD operations)
- Rich Text Editing with **Tiptap** (modern WYSIWYG editor)
- SEO-friendly slugs auto-generated from the title
- Dynamic blog post rendering based on slug
- MongoDB integration with **Mongoose**
- Dynamic SEO meta tags for each post (title, description, Open Graph)
- Protected admin access

## 🛠️ Tech Stack

### Frontend

- [Next.js (App Router)](https://nextjs.org/)
- [Tiptap Editor](https://tiptap.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend

- [Next.js API Routes]
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com/)



### 📦 Installation & Setup

### 1. **Clone the repository**

   ```bash
   git clone https://github.com/kuruvapavani/truly-ias-blog-task.git
   cd truly-ias-blog-task
   ```

### 2. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### 3. **Backend Setup**
   Open a new terminal:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

### 4. Environment Variables

Create a `.env.local` file and add the following:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

### 5. Run the Development Server

```bash
npm run dev
```

## 🧪 API Endpoints

* `GET /api/posts` – List all posts
* `POST /api/posts/create` – Create a new post
* `GET /api/posts/[slug]` – Get post by slug
* `PUT /api/posts/[slug]` – Update post by slug
* `DELETE /api/posts/[slug]` – Delete post by slug

## 🧠 Future Improvements

* Add image upload support in the rich text editor
* Implement pagination and categories
* Add authentication with JWT or NextAuth
* Add comments section for public users

## 📄 License

This project is licensed for educational and internship use only.

```
