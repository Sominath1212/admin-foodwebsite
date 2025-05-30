import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

const FoodList = () => {
  // Sample food data (Replace with real API data)
  const { foods } = useData();
  console.log(foods);

  // const [foods, setFoods] = useState([
  //   {
  //     id: 1,
  //     name: "Burger",
  //     category: "Fast Food",
  //     description: "Cheesy beef burger",
  //     price: 5.99,
  //     image: "https://via.placeholder.com/80",
  //   },
  //   {
  //     id: 2,
  //     name: "Pizza",
  //     category: "Fast Food",
  //     description: "Delicious cheese pizza",
  //     price: 9.99,
  //     image: "https://via.placeholder.com/80",
  //   },
  //   {
  //     id: 3,
  //     name: "Pasta",
  //     category: "Italian",
  //     description: "Creamy Alfredo pasta",
  //     price: 7.99,
  //     image: "https://via.placeholder.com/80",
  //   },
  // ]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Food List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.id} className="text-left hover:bg-gray-100">
                  <td className="p-3 border">
                    <img
                      src={food.image_url}
                      alt={food.name}
                      className="h-12 w-12 rounded-md mx-auto"
                    />
                  </td>
                  <td className="p-3 border">{food.name}</td>
                  <td className="p-3 border">{food.category}</td>
                  <td className="p-3 border">₹{food.price.toFixed(2)}</td>
                  <td className="p-3 border">{food.description}</td>
                  <td className="p-3 border ">
                    <Link to={`/update-food/${food.id}`}>
                      <button className="bg-orange-500 cursor-pointer text-white px-3 py-1 rounded mr-2 hover:bg-orange-600">
                        <MdModeEdit></MdModeEdit>
                      </button>
                    </Link>
                    <Link to={`/delete-food/${food.id}`}>
                      <button className="bg-orange-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-orange-600">
                        <MdDelete />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodList;
