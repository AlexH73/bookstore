import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";


export default function Register() {
const navigate = useNavigate();
const { register } = useAuth();


const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const handleRegister = (e: React.FormEvent) => {
e.preventDefault();
register(email, password);
navigate("/dashboard");
};


return (
<div>
<h2>Registration</h2>
<form onSubmit={handleRegister}>
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
<button type="submit">Register</button>
</form>
<p>
Already have an account? <Link to="/login">Log in </Link>
</p>
</div>
);
}