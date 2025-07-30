import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import Dashboard from './components/Dashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/login',
    element: (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Login</h1>
          <p className="text-gray-300">Login page coming soon...</p>
        </div>
      </div>
    ),
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
  },
])