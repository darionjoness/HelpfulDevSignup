import { useState } from 'react'
import Showcase from './components/Showcase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Showcase />
    </div>
  )
}

export default App
