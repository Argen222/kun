import { useState } from "react";
import { Trash2 } from "lucide-react";

function CartPage({ cart, onRemoveItem, clearCart }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    if (!name || !phone || !address) {
      alert("Бардык талааларды толтуруңуз!");
      return;
    }

    const cartDetails = cart.map(item => `${item.name} (x${item.quantity})`).join(", ");
    const message = `Саламатсызбы! Жаңы заказ:\n\n` +
                    `Кардар: ${name}\n` +
                    `Телефон: ${phone}\n` +
                    `Дареги: ${address}\n\n` +
                    `Товарлар: ${cartDetails}\n` +
                    `Жалпы сумма: $${total.toFixed(2)}`;

    const phoneNumber = "996770150025"; // Сенин Ватсап номериң
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, "_blank");
    clearCart();
  };

  return (
    <div className="pt-32 px-4 max-w-5xl mx-auto pb-16">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      
      {cart.length === 0 ? (
        <p className="text-muted-foreground">Корзина бош.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Товарлар тизмеси */}
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-6 p-6 border border-border rounded-2xl bg-card shadow-sm">
                {/* Сүрөт */}
                <img 
                  src={item.image || "https://via.placeholder.com/150"} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-xl"
                />
                
                {/* Товар маалыматы */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Саны: {item.quantity}</p>
                  <p className="font-bold text-lg mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                {/* Өчүрүү */}
                <button onClick={() => onRemoveItem(item.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-full">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Заказ тариздөө формасы */}
          <div className="bg-card p-6 rounded-2xl border border-border h-fit space-y-4 shadow-sm">
            <h2 className="font-bold text-xl">Заказды тариздөө</h2>
            <input className="w-full p-3 border rounded-lg bg-background" placeholder="Аты-жөнүңүз" onChange={e => setName(e.target.value)} />
            <input className="w-full p-3 border rounded-lg bg-background" placeholder="Телефон номериңиз" onChange={e => setPhone(e.target.value)} />
            <textarea className="w-full p-3 border rounded-lg bg-background" placeholder="Толук дарегиңиз" onChange={e => setAddress(e.target.value)} />
            
            <div className="pt-4 border-t border-border">
              <p className="text-2xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
              <button 
                onClick={handleOrder}
                className="w-full bg-primary text-white p-4 rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Ватсап аркылуу заказ берүү
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;