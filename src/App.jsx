import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Resister from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/DeletePost'
import ProtectedRoute from './components/protectedRoute'
import Layout from './components/Layout'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/post/:id' element={<ProtectedRoute><PostDetail></PostDetail></ProtectedRoute>}></Route>
          <Route path='/create' element={<ProtectedRoute><CreatePost></CreatePost></ProtectedRoute>}></Route>
          <Route path='/home' element={<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
          <Route path='/register' element={<Resister/>} />
          <Route path='/login' element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App