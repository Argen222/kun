import { useState } from "react";
import { useNavigate, Link } from "react-router";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Алдын ала текшерүү
    if (username.length < 3) {
      alert("Логин кеминде 3 белгиден турушу керек!");
      return;
    }
    if (password.length < 6) {
      alert("Пароль кеминде 6 белгиден турушу керек!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        alert("Ийгиликтүү катталдыңыз! Эми кириңиз.");
        navigate("/login");
      } else {
        const errorData = await res.json();
        alert(errorData.username ? "Бул логин эчак колдонулган!" : "Катталууда ката кетти.");
      }
    } catch (err) {
      alert("Сервер менен байланышуу мүмкүн эмес!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-md mx-auto p-8 border border-border rounded-2xl bg-card shadow-sm">
        <h2 className="text-3xl font-bold mb-6 text-center">Катталуу</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Логин</label>
            <input 
              className="w-full p-3 border border-border rounded-lg bg-background" 
              type="text" 
              placeholder="Колдонуучунун аты" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Пароль</label>
            <input 
              className="w-full p-3 border border-border rounded-lg bg-background" 
              type="password" 
              placeholder="********" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button 
            className="w-full bg-primary text-primary-foreground font-bold p-3 rounded-lg hover:opacity-90 transition-opacity" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Жүктөлүүдө..." : "Катталуу"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Эчак катталгансызбы? <Link to="/login" className="text-primary hover:underline">Кирүү</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;