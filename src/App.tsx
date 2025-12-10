import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/RegisterUndLogin/Login";
import Register from "../src/RegisterUndLogin/Register";
import Dashboard from "../src/RegisterUndLogin/Dashboard";
import ProtectedRoute from "./RegisterUndLogin/utils/ProtectedRoute";


export default function App() {
return (
<Routes>
<Route path="/" element={<Navigate to="/login" replace />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />


<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard />
</ProtectedRoute>
}
/>
</Routes>
);
}