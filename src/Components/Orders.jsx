import React from "react";
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";
export default function Orders() {
  const { orders } = useData();
  console.log("orders", orders);

  return (
    <div className="h-[100vh] w-[100vw]">
      <h2>Orders</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3 border">Order ID</th>
            <th className="p-3 border">Items</th>
            <th className="p-3 border">Total Bill</th>
            <th className="p-3 border">Address</th>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Payment Method</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Order Date</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center hover:bg-gray-100">
              <td className="p-3 border">{order.id}</td>
              <td className="p-3 border">{order.items}</td>
              <td className="p-3 border">{order.price}</td>
              <td className="p-3 border">{order.address}</td>
              <td className="p-3 border">{order.name}</td>
              <td className="p-3 border">{order.payment_method}</td>
              <td
                className={
                  order.status == "completed"
                    ? "text-green-500 inline p-3 border-black "
                    : order.status == "pendding"
                    ? "text-yellow-500 inline p-3 border-black "
                    : order.status == "failed"
                    ? "text-red-500 inline p-3 border-black "
                    : "p-3 border"
                }
              >
                {order.status}
              </td>
              <td className="p-3 border">{order.dinak}</td>
              <td className="p-3 border">
                <Link to={`/update-order/${order.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
