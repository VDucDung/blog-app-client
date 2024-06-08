import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'

import 'App.css'
import HomePage from 'pages/home/HomePage'
import Admin from 'pages/admin/screens/Admin'
import LoginPage from 'pages/Login/LoginPage'
import AdminLayout from 'pages/admin/AdminLayout'
import ProfilePage from 'pages/profile/ProfilePage'
import RegisterPage from 'pages/register/RegisterPage'
import NewPost from 'pages/admin/screens/posts/NewPost'
import EditPost from 'pages/admin/screens/posts/EditPost'
import Comments from 'pages/admin/screens/comments/Comments'
import ManagePosts from 'pages/admin/screens/posts/ManagePosts'
import Categories from 'pages/admin/screens/categories/Categories'
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage'

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/new" element={<NewPost />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="categories/manage" element={<Categories />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
