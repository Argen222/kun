import { useState } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      // Токендерди сактап алуу
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      alert("Ийгиликтүү кирдиңиз!");
      navigate("/"); // Башкы бетке жөнөтүү
    } else {
      alert("Логин же пароль ката!");
    }
  };

  return (
    <div className="pt-32 max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Кирүү</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input className="w-full p-2 border rounded" type="text" placeholder="Логин" onChange={(e) => setUsername(e.target.value)} />
        <input className="w-full p-2 border rounded" type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-primary text-white p-2 rounded" type="submit">Кирүү</button>
      </form>
    </div>
  );
}

export default LoginPage;