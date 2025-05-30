import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function RemoveFood() {
  const { id } = useParams();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [order, setOrder] = useState({});
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/food/get-food/" + id)
        .then((response) => {
          setOrder(response.data.food);
          // console.log("Food", response.data.food);
        });
    } catch (error) {
      toast.error("something went happend");
      console.log(error.data.message);
      throw error;
    }
  }, [id]);

  const handleDelete = () => {
    setDeleteLoading(true);
    try {
      axios
        .delete(`http://localhost:4000/api/food/delete-food/${id}`)
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
          navigate("/");
        });
    } catch (error) {
      toast.error("somethig went wrong");
      throw error;
    }
    setDeleteLoading(false);
  };

  return (
    <div>
      <h1>Delete Food</h1>
      {order ? (
        <div>
          <div className="w-[90%] border-2    grid grid-cols-5 text-center font-bold mx-5 border-b-none p-4 ">
            <h2>Image</h2>
            <h2 className=" text-center felx items-center justify-center  ">
              Name
            </h2>
            <p className=" text-center felx items-center justify-center  ">
              Description
            </p>
            <p className=" text-center felx items-center justify-center  ">
              Price
            </p>
            <p className=" text-center felx items-center justify-center  ">
              Category
            </p>
          </div>
          <div className="w-[90%] border-2  border-gray-400 rounded  grid grid-cols-5 text-center font-bold mx-5 p-4 ">
            <img
              src={order.image_url}
              alt=""
              className="border h-25  relative left-10 "
            />
            <h2 className="text-center felx items-center justify-center  ">
              {order.name}
            </h2>
            <p className="text-center felx items-center justify-center  ">
              {order.description}
            </p>
            <p className="text-center felx items-center justify-center  ">
              {order.price}
            </p>
            <p className="text-center felx items-center justify-center  ">
              {order.category}
            </p>
          </div>
        </div>
      ) : (
        "no Food available"
      )}
      <div className="flex items-center w-[90%] my-2  justify-between">
        <p className="border border-orange-500 p-3 w-40 cursor-pointer text-center rounded-2xl">
          cancel
        </p>
        <button
          onClick={handleDelete}
          className="bg-orange-500 p-3 w-40 rounded hover:bg-orange-600 cursor-pointer"
        >
          {deleteLoading ? "loadConfig..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default RemoveFood;
