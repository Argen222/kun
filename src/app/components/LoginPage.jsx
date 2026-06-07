import { useState } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("access_token", data.access_token);
      alert("Ийгиликтүү кирдиңиз!");
      navigate("/admin");
    } else {
      alert("Email же пароль ката!");
    }
  };

  return (
    <div className="pt-32 max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Кирүү</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full p-3 border rounded-xl bg-background"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 border rounded-xl bg-background"
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-amber-500 text-white p-3 rounded-xl font-bold" type="submit">
          Кирүү
        </button>
      </form>
    </div>
  );
}

export default LoginPage;