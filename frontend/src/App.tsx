import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { fetchHello } from './services/api'
import HomePage from './pages/HomePage';

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Fetch data from backend when component mounts
    fetchHello()
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div className="App">
      <HomePage />
    </div>
  )
}

export default App
