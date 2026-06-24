import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

function CartPage({ cart, onRemoveItem, clearCart, onUpdateQuantity }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // 📱 Телефон номерин форматтоо функциясы
  const formatPhoneNumber = (value) => {
    // Бардык сан эмес символдорду алып салуу
    const cleaned = value.replace(/\D/g, '');
    
    // Эгерде 996 менен башталса, аны алып салуу (кайталанып калбаш үчүн)
    let number = cleaned;
    if (number.startsWith('996')) {
      number = number.slice(3);
    }
    
    // Максимум 9 сан (70X XXX XXX)
    if (number.length > 9) {
      number = number.slice(0, 9);
    }
    
    // Форматташтыруу: 70X XXX XXX
    let formatted = '+996 ';
    if (number.length > 0) {
      formatted += number.slice(0, 3);
    }
    if (number.length > 3) {
      formatted += ' ' + number.slice(3, 6);
    }
    if (number.length > 6) {
      formatted += ' ' + number.slice(6, 9);
    }
    
    return formatted;
  };

  // Телефон өзгөргөндө
  const handlePhoneChange = (e) => {
    const rawValue = e.target.value;
    // Эгерде колдонуучу +996 деп баштаса, аны алып салуу
    let cleaned = rawValue.replace(/\D/g, '');
    if (cleaned.startsWith('996')) {
      cleaned = cleaned.slice(3);
    }
    // Максимум 9 сан
    if (cleaned.length > 9) {
      cleaned = cleaned.slice(0, 9);
    }
    // Форматтап коюу
    setPhone(formatPhoneNumber(cleaned));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    if (!name || !phone || !address) {
      alert("Заполните все поля!");
      return;
    }

    // Телефондон бардык сандарды алып, номерди тазалоо
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 12) {
      alert("Телефон номери туура эмес! Мисал: +996 700 123 456");
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

  const handleIncrease = (itemId) => {
    onUpdateQuantity(itemId, 1);
  };

  const handleDecrease = (itemId) => {
    onUpdateQuantity(itemId, -1);
  };

  return (
    <div className="pt-32 px-4 max-w-5xl mx-auto pb-16">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      
      {cart.length === 0 ? (
        <p className="text-muted-foreground">Корзина пуста.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-6 p-6 border border-border rounded-2xl bg-card shadow-sm">
                <img 
                  src={item.image || "https://via.placeholder.com/150"} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-xl"
                />
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Количество: {item.quantity}</p>
                  <p className="font-bold text-lg mt-2">сом {(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDecrease(item.id)}
                    className="p-2 rounded-full border border-border hover:bg-muted transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button 
                    onClick={() => handleIncrease(item.id)}
                    className="p-2 rounded-full border border-border hover:bg-muted transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={() => onRemoveItem(item.id)} 
                  className="p-2 hover:bg-destructive/10 text-destructive rounded-full"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

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
              placeholder="+996 700 123 456" 
              value={phone}
              onChange={handlePhoneChange} 
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