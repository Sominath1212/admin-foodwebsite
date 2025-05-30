import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react"; // Icon for mobile view
import { MdFastfood } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isActive, setIsActive] = useState("home");
  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-screen fixed top-0 left-0 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <div className="p-4 flex justify-between items-center">
          <h1
            className={`text-xl font-bold  transition-all duration-300 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            Food Delivery
          </h1>{" "}
          <br />
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link
                to="/"
                className={`flex   items-center justify-center  gap-2 text-2xl m-1 rounded ${
                  isActive == "home" ? "bg-orange-400" : ""
                }`}
                onClick={() => setIsActive("home")}
              >
                <IoMdHome
                  className={isOpen ? "mt-3 text-4xl mb-1  " : "mt-0 "}
                ></IoMdHome>
                <span
                  className={`w-full  relative top-1  ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Home
                </span>
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link
                to="/add-food"
                className={`flex items-center justify-center gap-2 text-2xl m-1 rounded ${
                  isActive == "add-food" ? "bg-orange-400" : ""
                }`}
                onClick={() => setIsActive("add-food")}
              >
                <MdAddCircle
                  className={isOpen ? "mt-3 text-4xl mb-1  " : "mt-0 "}
                ></MdAddCircle>
                <span className={`w-full  ${isOpen ? "block" : "hidden"}`}>
                  Add Food
                </span>
              </Link>
            </li>

           
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link
                to="/food-list"
                className={`flex items-center justify-center gap-2 text-2xl m-1 rounded ${
                  isActive == "food-list" ? "bg-orange-400" : ""
                }`}
                onClick={() => setIsActive("food-list")}
              >
                <MdFastfood
                  className={isOpen ? "mt-3 text-4xl mb-1  " : "mt-0 "}
                ></MdFastfood>
                <span className={`w-full ${isOpen ? "block" : "hidden"}`}>
                  Food List
                </span>
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link
                to="/orders"
                className={`flex items-center justify-center gap-2 text-2xl m-1 rounded ${
                  isActive == "orders" ? "bg-orange-400" : ""
                }`}
                onClick={() => setIsActive("orders")}
              >
                <CiDeliveryTruck
                  className={isOpen ? "mt-3 text-4xl mb-1  " : "mt-0 "}
                ></CiDeliveryTruck>
                <span className={`w-full ${isOpen ? "block" : "hidden"}`}>
                  Orders
                </span>
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link
                to="/categories"
                className={`flex items-center justify-center gap-2 text-2xl m-1 rounded ${
                  isActive == "categories" ? "bg-orange-400" : ""
                }`}
                onClick={() => setIsActive("categories")}
              >
                <MdCategory
                  className={isOpen ? "mt-3 text-4xl mb-1  " : "mt-0 "}
                ></MdCategory>
                <span className={`w-full ${isOpen ? "block" : "hidden"}`}>
                  Categories
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div
        className={`ml-${
          isOpen ? "64" : "16"
        } p-6 transition-all duration-300 w-full`}
      >
        <h2 className="text-4xl font-bold text-center text-orange-500 ">
          Welcome to Admin Panel
        </h2>
      </div>
    </div>
  );
};

export default Sidebar;
