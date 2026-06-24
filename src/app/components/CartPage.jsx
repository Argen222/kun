import { useState } from "react";
import { Trash2 } from "lucide-react";

function CartPage({ cart, onRemoveItem, clearCart }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    if (!name || !phone || !address) {
      alert("Заполните все поля!");
      return;
    }

    const cartDetails = cart.map(item => `${item.name} (x${item.quantity})`).join(", ");
    const message = `Здравствуйте! Новый заказ:\n\n` +
                    `Клиент: ${name}\n` +
                    `Телефон: ${phone}\n` +
                    `Адрес: ${address}\n\n` +
                    `Товары: ${cartDetails}\n` +
                    `Общая сумма: $${total.toFixed(2)}`;

    const phoneNumber = "996770150025"; // Твой номер WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, "_blank");
    clearCart();
  };

  return (
    <div className="pt-32 px-4 max-w-5xl mx-auto pb-16">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      
      {cart.length === 0 ? (
        <p className="text-muted-foreground">Корзина пуста.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Список товаров */}
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-6 p-6 border border-border rounded-2xl bg-card shadow-sm">
                {/* Изображение */}
                <img 
                  src={item.image || "https://via.placeholder.com/150"} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-xl"
                />
                
                {/* Информация о товаре */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Количество: {item.quantity}</p>
                  <p className="font-bold text-lg mt-2">сом{(item.price * item.quantity).toFixed(2)}</p>
                </div>

                {/* Удаление */}
                <button onClick={() => onRemoveItem(item.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-full">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Форма оформления заказа */}
          <div className="bg-card p-6 rounded-2xl border border-border h-fit space-y-4 shadow-sm">
            <h2 className="font-bold text-xl">Оформление заказа</h2>
            <input className="w-full p-3 border rounded-lg bg-background" placeholder="Ваше имя" onChange={e => setName(e.target.value)} />
            <input className="w-full p-3 border rounded-lg bg-background" placeholder="Ваш номер телефона" onChange={e => setPhone(e.target.value)} />
            <textarea className="w-full p-3 border rounded-lg bg-background" placeholder="Ваш полный адрес" onChange={e => setAddress(e.target.value)} />
            
            <div className="pt-4 border-t border-border">
              <p className="text-2xl font-bold mb-4">Итого: сом{total.toFixed(2)}</p>
              <button 
                onClick={handleOrder}
                className="w-full bg-primary text-white p-4 rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Заказать через WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;