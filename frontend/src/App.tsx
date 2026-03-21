import { useEffect } from 'react'
import './App.css'
import { fetchHello } from './services/api'
import HomePage from './pages/HomePage';

function App() {
  useEffect(() => {
    // Fetch data from backend when component mounts
    fetchHello()
      .then(data => console.log('Backend response:', data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div className="App">
      <HomePage />
    </div>
  )
}

export default App
