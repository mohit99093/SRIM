import React,{ useState } from 'react';
import Dashboardst from './components/Dashboard_st.js'
import Dashboardpr from './components/Dashboard_pr'
import Dashboardad from "./components/Dashboard_ad"
import Dashboardmain from "./components/Dashboard_main"
import SignIn from './components/Signin'
import SignUp from './components/SignUp'
import { ProfessorDataProvider } from "./components/Professor/ProfessorContext"
import { StudentDataProvider } from "./components/Student/StudentContext"
import { AdminDataProvider } from "./components/Admin/AdminContext"
import { MainadminDataProvider } from './components/Mainadmin/MainadminContext.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
   const [isAuth, setisAuth] = useState(false)

  return (
    <div className="App">
      <Router>
        <Switch>
             <Route path="/main" exact><MainadminDataProvider ><Dashboardmain /> </MainadminDataProvider></Route>
             <Route path="/" exact  ><SignIn  setisAuth={setisAuth} isAuth={isAuth} />  </Route> 
            <Route path="/signup" exact  > <SignUp setisAuth={setisAuth} /> </Route>
            <Route path="/Student" exact>  <StudentDataProvider><Dashboardst isAuth={isAuth}  /> </StudentDataProvider>  </Route>
            <Route path="/Admin" exact> <AdminDataProvider><Dashboardad isAuth={isAuth} /></AdminDataProvider> </Route>
            <Route path="/Prof" exact><ProfessorDataProvider><Dashboardpr isAuth={isAuth} /></ProfessorDataProvider> </Route>
            </Switch>
      </Router>
    </div>
  );
}

export default App;
