import { useState } from 'react'
import './App.css'
import Button from '@mui/material/Button';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Join } from './Join';
import { Chat } from './Chat';
function App() {
  const commonHeaderFooter= createBrowserRouter([
    {
      path:"/",
      element:<Join></Join>
    },
    {
      path:"/chat",
      element:<Chat></Chat>
    }
  ])
   return <RouterProvider router={commonHeaderFooter}></RouterProvider>
}

export default App
