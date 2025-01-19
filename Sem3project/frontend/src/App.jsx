// import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from "./Components/login/Login"
import Signup from "./Components/signup/Signup"
import Student from './Components/blog/blog'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Student/>} />
      </Routes>
    </div>
  )
}

export default App