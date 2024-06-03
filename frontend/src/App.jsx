import routers from "./routers"
import {RouterProvider} from "react-router-dom"

function App() {
  
  return (
    <>
     <RouterProvider router={routers} />
    </>
  )
}

export default App
