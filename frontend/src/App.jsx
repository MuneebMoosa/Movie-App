import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navigation from './pages/Auth/Navigation';
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <ToastContainer theme="dark" />
      <Navigation />
      <main className="flex-1 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  )
};

export default App
 