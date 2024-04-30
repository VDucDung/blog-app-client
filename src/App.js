import 'App.css'
import HomePage from 'pages/home/HomePage'
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from 'pages/register/RegisterPage'
function App() {
  return (
    <div className='App font-opensans'>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='/blog/:id' element={<ArticleDetailPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App
