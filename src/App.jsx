import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Note from './Components/Note/Note'
import NotFound from './Components/NotFound/NotFound'
import { RecoilRoot } from 'recoil'


let route = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "note", element: <Note /> },
      { path: "*", element: <NotFound /> },
    ]
  }
])



function App() {
  return (
    <>
      <RecoilRoot>
        <RouterProvider router={route}></RouterProvider>
      </RecoilRoot>
    </>
  )
}

export default App
