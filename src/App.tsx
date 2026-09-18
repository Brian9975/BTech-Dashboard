import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MyDash from "./pages/MyDash";
import Leads from "./pages/Leads";
import Today from "./pages/Today";
import MyScripts from "./pages/MyScripts";
import Layout from "./layout/Layout";
import LeadContextProvider from "./context/LeadContext";
import Lead from "./pages/Lead";
import IndividualStage from "./pages/IndividualStage";
import TaskContextProvider from "./context/TaskContext";
import Login from "./auth/Login";
import ThemeContextProvider from "./context/ThemeContext";

function App() {
  return (
    <Router>
      <TaskContextProvider>
        <LeadContextProvider>
          <ThemeContextProvider>

            <Routes>
            
              
              <Route path="/login" element={<Login/>}></Route>
          
  
              <Route path="/mydash" element={<Layout><MyDash /></Layout>}></Route>
              <Route path="/leads" element={<Layout><Leads /></Layout>}></Route>
              <Route path="/today" element={<Layout><Today /></Layout>}></Route>
              <Route path="/myscripts" element={<Layout><MyScripts /></Layout>}></Route>
              <Route path="/lead/:id" element={<Layout><Lead /></Layout>} />
              <Route path="/stage/:name" element={<Layout><IndividualStage /></Layout>} />

              {/* Navigate / to mydash */}
              <Route path="/" element={<Navigate to="/mydash" />}></Route>

              {/* Navigate uknown routes to mydash */}
              <Route path="*" element={<Navigate to="/mydash" />}></Route>
          
            </Routes>
        </ThemeContextProvider>
        </LeadContextProvider>
      </TaskContextProvider>
    </Router>
  );
}
export default App;
