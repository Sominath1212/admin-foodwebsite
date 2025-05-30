import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Addfood from "./Components/Addfood";
import UpdateFood from "./Components/UpdateFood";
import FoodList from "./Components/FoodList";
import DeleteFood from "./Components/RemoveFood";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import Categories from "./Components/Categories";
import Orders from "./Components/Orders";
import { DataProvider } from "./context/DataContext";
import UpdateOrder from "./Components/UpdateOrder";

function App() {
 
  return (
    <div>
      <Router>
        <DataProvider>
          <Sidebar />
          <div className="ml-64 p-6">
            {/* Adjusts content for the sidebar */}
            <Routes>
              <Route path="/" element={<Home />}>
                Home
              </Route>
              <Route path="/login" element={<Login />}>
                login
              </Route>
              <Route path="/update-food/:id" element={<UpdateFood />} />
              <Route path="/delete-food/:id" element={<DeleteFood />} />
              <Route path="/add-food" element={<Addfood />} />
              <Route path="/food-list" element={<FoodList />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/update-order/:id" element={<UpdateOrder />} />
            </Routes>
          </div>
          <ToastContainer />
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
