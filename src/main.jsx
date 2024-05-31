import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Navigation from "./router"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
   <Navigation></Navigation>
   </BrowserRouter>
  </React.StrictMode>,
)
