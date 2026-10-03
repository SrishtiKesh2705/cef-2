import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import StudentDashboard from "../pages/StudentDashboard.jsx";
import NotFound from "../pages/NotFound.jsx";


function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/student" element={<StudentDashboard/>}/>
                <Route path="/admin" element={<AdminDashboard/>}/>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;