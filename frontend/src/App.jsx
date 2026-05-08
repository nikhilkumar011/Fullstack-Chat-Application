import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login, Signup, ProfilePage,HomePage } from './pages/index.js'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Toaster } from "react-hot-toast";

function App() {

  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>

      <Navbar />
      <Toaster />

      <Routes>

        <Route
          path='/signup'
          element={!authUser ? <Signup /> : <Navigate to='/' />}
        />

        <Route
          path='/login'
          element={!authUser ? <Login /> : <Navigate to='/' />}
        />

        <Route
          path='/'
          element={authUser ? <HomePage/> : <Navigate to='/login' />}
        />

        <Route
          path='/profile'
          element={authUser ? <ProfilePage /> : <Navigate to='/login' />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App