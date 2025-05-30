import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useData } from "../context/DataContext";

import { useNavigate } from "react-router-dom";

function UpdateFood() {
  const { id } = useParams();
  const { categories } = useData();
  const [order, setOrder] = useState({});
  const [updateloading, setUpdateLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [food, setFood] = useState({
    image: "",
    name: "",
    category: "",
    description: "",
    price: "",
  });

  // console.log(categories);
  const navigate = useNavigate();
  const [imageLoader, setImageLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/food/get-food/" + id)
        .then((response) => {
          setOrder(response.data.food);
          // console.log("Food", response.data.food);
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, [id]);
  // console.log("order", order);

  // uploading image
  const handleImageChange = async (e) => {
    setImageLoader(true);
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "labourimages");
    data.append("cloud_name", "dzcz9gnvd");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzcz9gnvd/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadurlimage = await res.json();
    console.log(uploadurlimage);

    setFood({ ...food, image: uploadurlimage.url });
    // setFormData({ ...formData, [e.target.image]: uploadurlimage.url });
    // console.log(uploadurlimage.url);
    setPreview(uploadurlimage.url);
    setImageLoader(false);
  };
  const updatestatus = () => {
    setUpdateLoading(true);
    try {
      axios
        .patch(`http://localhost:4000/api/food/update-food/${id}`, food)
        .then((response) => {
          if (response.status == 200) {
            toast.success(response.data.message);
            navigate("/");
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
    console.log(food);

    updatestatus(food);
  };

  console.log(food);

  return (
    <div>
      <div>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div className="flex flex-col items-center mb-4">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {imageLoader ? (
                  //image loader
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <span>No Image</span>
                )}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 ml-20 hover:text-green-500 cursor-pointer"
            />
          </div>

          {/* Food Name */}
          <div>
            <label className="block text-gray-700">Food Name</label>
            <input
              type="text"
              name="name"
              value={food.name}
              onChange={handleChange}
              placeholder="Enter food name"
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={food.category}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={food.description}
              onChange={handleChange}
              placeholder="Enter food description"
              className="w-full p-2 border rounded mt-1"
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={food.price}
              onChange={handleChange}
              placeholder="Enter food price"
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200"
          >
            {updateloading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <span>Update Food</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateFood;
