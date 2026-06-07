import { useState } from "react";
import { useNavigate, Link } from "react-router";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Пароль кеминде 6 белгиден турушу керек!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://kun-backend1.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, full_name: fullName, password }),
      });
      if (res.ok) {
        alert("Ийгиликтүү катталдыңыз! Эми кириңиз.");
        navigate("/login");
      } else {
        const errorData = await res.json();
        alert(errorData.detail || "Катталууда ката кетти.");
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
            <label className="block text-sm font-medium mb-1">Аты-жөнү</label>
            <input
              className="w-full p-3 border border-border rounded-lg bg-background"
              type="text"
              placeholder="Аты-жөнүңүз"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              className="w-full p-3 border border-border rounded-lg bg-background"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            className="w-full bg-amber-500 text-white font-bold p-3 rounded-lg hover:opacity-90 transition-opacity"
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