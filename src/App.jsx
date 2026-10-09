import { createBrowserRouter, RouterProvider } from 'react-router'

import 'leaflet/dist/leaflet.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'

import Layout from './layout/Layout'

import Home from './pages/Home'
import History from './pages/History'
import HistoryDetails from './pages/HistoryDetails'
import NotFound from './pages/NotFound'


const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <Error message="An unexpected error occurred." />,
    children: [
      {index: true,Component: Home,},
      {path: "/history",Component: History,},
      {path: "/history/:ip",Component: HistoryDetails,},
      {path: "/error/:message",Component: Error,},
      {path: "*",Component: NotFound,}
    ]
  }
]); 

function App() {
  return (<RouterProvider router={router} />)
}

export default App
