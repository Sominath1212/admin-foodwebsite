
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useData } from "../context/DataContext";

const Home = () => {
  // Sample data
  const { orders } = useData();
  const stats = {
    totalOrders: orders.length,
    completedOrders: orders.filter((order) => order.status === "completed")
      .length,
    failedOrders: orders.filter((order) => order.status === "failed").length,
    pendingOrders: orders.filter((order) => order.status === "pendding").length,
  };

  

  function getComplatedOrders(){

   
  }

  const chartData = [
    { name: "Completed", value: stats.completedOrders },
    { name: "Failed", value: stats.failedOrders },
    { name: "Pending", value: stats.pendingOrders },
  ];

  

  const COLORS = ["#4CAF50", "#F44336", "#FFC107"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded">
          Total Orders: {stats.totalOrders}
        </div>
        <div className="bg-green-500 text-white p-4 rounded">
          Completed Orders: {stats.completedOrders}
        </div>
        <div className="bg-red-500 text-white p-4 rounded">
          Failed Orders: {stats.failedOrders}
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded">
          Pending Orders: {stats.pendingOrders}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Order Completion</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Orders Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Order Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 className="text-lg font-bold mt-6">Recent Orders</h3>
      <div className="bg-white p-4 rounded shadow mt-2">
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
                <td className="p-3 border">{order.status}</td>
                <td className="p-3 border">{order.dinak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
