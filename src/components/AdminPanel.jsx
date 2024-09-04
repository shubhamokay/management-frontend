import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./productCard";
import Register from "./Register";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products
    axios
      .get(`https://management-backend-oput.onrender.com/api/products`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => setError("Error fetching products"));

    // Fetch users
    axios
      .get(`https://management-backend-oput.onrender.com/api/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => setError("Error fetching users"));
  }, []);

  const handleRemoveUser = (userId) => {
    axios
      .delete(`https://management-backend-oput.onrender.com/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => setUsers(users.filter((user) => user._id !== userId)))
      .catch((error) => setError("Error removing user"));
  };

  return (
    <div className="admin-panel">
      <h1 className="text-3xl font-bold text-center my-6">Admin Panel</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <h2 className="text-2xl font-bold text-center my-4">Products</h2>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="">
        <Register />
      </div>
      <h2 className="text-2xl font-bold text-center my-4">Users</h2>
      <div className="flex justify-center">
        <ul className="list-disc ml-6">
          {users.map((user) => (
            <li
              key={user._id}
              className="mb-2 flex items-center justify-between w-full"
            >
              <span className="text-center w-full">{user.username}</span>
              <button
                onClick={() => handleRemoveUser(user._id)}
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
