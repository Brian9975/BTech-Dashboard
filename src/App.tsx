import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import MyDash from "./pages/MyDash"
import Leads from "./pages/Leads"
import Today from "./pages/Today"
import MyScripts from "./pages/MyScripts"

function App() {
  
  
  return (
 <Router>
  <Routes>

    <Route path="/mydash" element={<MyDash/>}></Route>
    <Route path="/leads" element={<Leads/>}></Route>
    <Route path="/today" element={<Today/>}></Route>
    <Route path="/myscripts" element={<MyScripts/>}></Route>

      {/* Navigate / to mydash */}
    <Route path="/" element={<Navigate to="/mydash"/>}></Route>

    {/* Navigate uknown routes to mydash */}
    <Route path="*" element={<Navigate to="/mydash"/>}></Route>
  </Routes>
 </Router>
  )

}
export default App
