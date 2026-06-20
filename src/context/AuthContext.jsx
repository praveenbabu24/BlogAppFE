import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(null)

  const checkAuth = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
        withCredentials: true
      })
      setIsAuth(true)
    } catch (err) {
      setIsAuth(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}