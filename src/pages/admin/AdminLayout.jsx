import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'

const AdminLayout = () => {
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <Header />
      <main className="flex-1 bg-[#F9F9F9] p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
