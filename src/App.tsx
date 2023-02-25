import { RouterProvider } from "react-router-dom"
import routers from "./routes"
import './app.css'

function App() {
  return (
    <div className="app">
      <RouterProvider router={routers} />
    </div>

  )
}

export default App
