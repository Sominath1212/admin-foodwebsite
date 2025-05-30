import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
const url = "http://localhost:4000/api/";
// Create context
const DataContext = createContext();

// Provider

const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  //fetching all orders
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/category/get-categories")
        .then((response) => {
          // Access the data property
          const category = response?.data?.categories;

          setCategories(category);
          // toast.success(response.data.message);
        });
    } catch (err) {
      console.log(err);
    }

    //fetching food
    try {
      axios
        .get("http://localhost:4000/api/food/get-all-foods")
        .then((responce) => {
          // console.log("Food", responce.data);
          setFoods(responce.data);
        });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }

    //orders
    try {
      axios
        .get("http://localhost:4000/api/order/get-all-orders")
        .then((responce) => {
          // console.log("Orders", responce.data.data);
          setOrders(responce.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(categories);
  return (
    <DataContext.Provider
      value={{ orders, foods, categories, loading, setLoading }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook
const useData = () => useContext(DataContext);

// ✅ Export both correctly
export { DataProvider, useData };
