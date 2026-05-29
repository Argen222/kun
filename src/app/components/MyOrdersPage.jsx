import { useEffect, useState } from "react";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);

  useEffect(() => {
    // Кадимки заказдар
    fetch("https://kun-backend-qxcn.onrender.com/api/my-orders/", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
    })
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setOrders(data) : setOrders([]));

    // Индивидуалдык заказдар (Custom Orders)
    fetch("https://kun-backend-qxcn.onrender.com/api/custom-orders/") // Бул жерге эгер керек болсо да токен кош
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setCustomOrders(data) : setCustomOrders([]));
  }, []);

  return (
    <div className="min-h-screen pt-32 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Менин заказдарым</h1>
      
      {/* Кадимки заказдар */}
      <h2 className="text-xl font-semibold mb-4">Жөнөкөй заказдар</h2>
      <div className="space-y-4 mb-10">
        {orders.map(order => (
          <div key={order.id} className="border p-6 rounded-2xl bg-card shadow-sm">
            <p className="font-bold">Заказ №{order.id} - ${order.total_price}</p>
            <p>Статусу: {order.status}</p>
            <p>Дареги: {order.address}</p>
          </div>
        ))}
      </div>

      {/* Индивидуалдык заказдар */}
      <h2 className="text-xl font-semibold mb-4">Индивидуалдык литофаниялар</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customOrders.map(cOrder => (
          <div key={cOrder.id} className="border p-4 rounded-xl bg-muted">
            <img src={cOrder.image} alt="Lithophany" className="w-full h-40 object-cover rounded mb-2"/>
            <p className="font-bold">Заказ: {cOrder.shape} ({cOrder.size})</p>
            <p>Цена: ${cOrder.total_price}</p>
            <p>Статусу: {cOrder.status}</p>
            <p>Телефон: {cOrder.phone_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrdersPage;