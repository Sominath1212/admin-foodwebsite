import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateOrder() {
  const { id } = useParams();
  const [updateData, setupdateData] = useState("");
  const [order, setOrder] = useState({});
  const statusar = ["completed", "failed", "pendding"];
  const [updateloading, setUpdateLoading] = useState(false);
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setupdateData({ ...updateData, [name]: value });
  // };

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/order/get-order/" + id)
        .then((response) => {
          // console.log(response?.data?.categories);
          setOrder(response.data.data[0]);
          // console.log("order", response.data.data[0]);
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, [id]);
  // console.log("order", order);

  const updatestatus = () => {
    setUpdateLoading(true);
    try {
      axios
        .patch(`http://localhost:4000/api/order/update-order/${id}`, {
          status: updateData,
        })
        .then((response) => {
          console.log(response);

          if (response.status == 200) {
            toast.success("Order status updated please refesh");
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("something went happened..");
      throw error;
    }
    setUpdateLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateData);

    updatestatus(updateData);
  };
  return (
    <div>
      <div>
        {order ? (
          <div>
            <div className="w-[90%] border-2  border-gray-400 rounded  grid grid-cols-4 m-5 p-4 ">
              <p> ID:{order?.id}</p>
              <p> Name:{order?.name}</p>
              <p> ADDRESS:{order?.address}</p>
              <p> ITEMS:{order?.items}</p>
              <p> DATE:{order?.dinak}</p>
              <p
                className={
                  order.status == "completed"
                    ? "text-green-500 inline"
                    : order.status == "pendding"
                    ? "text-yellow-500 inline"
                    : order.status == "failed"
                    ? "text-red-500 inline"
                    : ""
                }
              >
                {" "}
                Status:{order?.status}
              </p>
              <p> PRICE:{order?.price}</p>
              <p> PAYMENT METHOD:{order?.payment_method}</p>
            </div>
          </div>
        ) : (
          "no order available"
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center flex-col justify-between m-20">
            <select
              name="category"
              value={updateData}
              onChange={(e) => setupdateData(e.target.value)}
              className="w-full p-2 border rounded mt-1 cursor-pointer"
              required
            >
              <option value="">Select a category</option>
              {statusar.map((cat, index) => (
                <option
                  key={index}
                  value={cat}
                  className="cursor-pointer active:bg-orange-500 active:"
                >
                  {cat}
                </option>
              ))}
            </select>
            <div className="flex items-center w-[90%] my-2  justify-between">
              <p className="border border-orange-500 p-3 w-40 cursor-pointer text-center rounded-2xl">
                cancel
              </p>
              <button className="bg-orange-500 p-3 w-40 rounded hover:bg-orange-600 cursor-pointer">
                {updateloading ? "loadConfig..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateOrder;
