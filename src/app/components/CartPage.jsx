import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

function CartPage({ cart, onRemoveItem, clearCart, onUpdateQuantity }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Жалпы сумманы эсептөө
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // WhatsApp аркылуу заказ жөнөтүү
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
                    `Общая сумма: сом ${total.toFixed(2)}`;

    const phoneNumber = "996770150025";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, "_blank");
    clearCart();
  };

  // Санын көбөйтүү
  const handleIncrease = (itemId) => {
    const item = cart.find(item => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + 1;
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  // Санын азайтуу
  const handleDecrease = (itemId) => {
    const item = cart.find(item => item.id === itemId);
    if (item) {
      if (item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        onUpdateQuantity(itemId, newQuantity);
      } else {
        onRemoveItem(itemId);
      }
    }
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
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 border border-border rounded-2xl bg-card shadow-sm">
                {/* Изображение */}
                <img 
                  src={item.image || "https://via.placeholder.com/150"} 
                  alt={item.name} 
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl flex-shrink-0"
                />
                
                {/* Информация о товаре */}
                <div className="flex-grow w-full sm:w-auto">
                  <h3 className="text-lg sm:text-xl font-bold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Количество: {item.quantity}</p>
                  <p className="font-bold text-lg mt-2">сом {(item.price * item.quantity).toFixed(2)}</p>
                </div>

                {/* Кнопки + и - */}
                <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                  <button 
                    onClick={() => handleDecrease(item.id)}
                    className="p-2 rounded-full border border-border hover:bg-muted transition w-10 h-10 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-semibold text-lg">{item.quantity}</span>
                  <button 
                    onClick={() => handleIncrease(item.id)}
                    className="p-2 rounded-full border border-border hover:bg-muted transition w-10 h-10 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  
                  {/* Удаление */}
                  <button 
                    onClick={() => onRemoveItem(item.id)} 
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-full ml-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Форма оформления заказа */}
          <div className="bg-card p-6 rounded-2xl border border-border h-fit space-y-4 shadow-sm">
            <h2 className="font-bold text-xl">Оформление заказа</h2>
            
            <input 
              className="w-full p-3 border rounded-lg bg-background" 
              placeholder="Ваше имя" 
              value={name}
              onChange={e => setName(e.target.value)} 
            />
            
            <input 
              className="w-full p-3 border rounded-lg bg-background" 
              placeholder="Телефон (например: 0700 123 456)" 
              value={phone}
              onChange={e => setPhone(e.target.value)} 
            />
            
            <textarea 
              className="w-full p-3 border rounded-lg bg-background" 
              placeholder="Ваш полный адрес" 
              value={address}
              onChange={e => setAddress(e.target.value)} 
            />
            
            <div className="pt-4 border-t border-border">
              <p className="text-2xl font-bold mb-4">Итого: сом {total.toFixed(2)}</p>
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