import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Blog from './components/blog'
import Login from './components/login/login'
import Register from './components/register/register'
import PrivateRoute from './routes/PrivateRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
      <ToastContainer />
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/blog" element={<Blog />} />
        </Route>
        <Route path="*" element={<div></div>} />
      </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App
