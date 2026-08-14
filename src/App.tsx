import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import MyDash from "./pages/MyDash"
import Leads from "./pages/Leads"
import Today from "./pages/Today"
import MyScripts from "./pages/MyScripts"
import Layout from "./layout/Layout"
import LeadContextProvider from "./context/LeadContext"
import Lead from "./pages/Lead"
import IndividualStage from "./pages/IndividualStage"
function App() {
  
  
  return (
 <Router>
  <LeadContextProvider>
  <Layout>
  <Routes>

    <Route path="/mydash" element={<MyDash/>}></Route>
    <Route path="/leads" element={<Leads/>}></Route>
    <Route path="/today" element={<Today/>}></Route>
    <Route path="/myscripts" element={<MyScripts/>}></Route>
    <Route path="/lead/:id" element={<Lead/>}/>
    <Route path="/stage/:name" element={<IndividualStage/>}/>

      {/* Navigate / to mydash */}
    <Route path="/" element={<Navigate to="/mydash"/>}></Route>

    {/* Navigate uknown routes to mydash */}
    <Route path="*" element={<Navigate to="/mydash"/>}></Route>
  </Routes>
  </Layout>
  </LeadContextProvider>
 </Router>
  )

}
export default App
