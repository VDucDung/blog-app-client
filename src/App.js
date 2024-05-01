import 'App.css'
import HomePage from 'pages/home/HomePage'
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from 'pages/register/RegisterPage'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <div className='App font-opensans'>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='/blog/:id' element={<ArticleDetailPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
