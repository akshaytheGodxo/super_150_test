import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const API = "https://api.imgflip.com/get_memes"
  const [data, setData] = useState([])        
  const [filteredData, setFilteredData] = useState([])  
  const [search, setSearch] = useState('')    

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(API)
        const memes = response.data.data.memes
        setData(memes)
        setFilteredData(memes)
      } catch (err) {
        console.error("Error fetching memes:", err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const results = data.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredData(results)
  }, [search, data])

  return (
    <>
      <h1 className='text-4xl font-bold'>Meme Template Viewer</h1>

      <input
        type='text'
        placeholder='Search memes...'
        className='border-2 w-full my-8 p-2 rounded-xl'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className='flex flex-wrap gap-8'>
        {filteredData.length > 0 ? (
          filteredData.map((item, idx) => (
            <div
              key={idx}
              className='rounded-xl flex flex-col gap-4 w-80 border-2 p-2 hover:shadow-lg transition'
            >
              <img
                src={item.url}
                alt={item.name}
                className='h-64 object-contain rounded-md'
              />
              <h2 className='text-xl font-semibold text-center'>{item.name}</h2>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-lg'>No memes found </p>
        )}
      </div>
    </>
  )
}

export default App
