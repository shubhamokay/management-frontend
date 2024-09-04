// src/components/UserPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './productCard';
// import ProductCard from './ProductCard';

const UserPanel = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://management-backend-oput.onrender.com/api/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then(response => setProducts(response.data))
    .catch(error => setError('Error fetching products'));
  }, []);

  return (
    <div className="user-panel">
      <h1 className="text-3xl font-bold text-center my-6">User Panel</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-wrap justify-center">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default UserPanel;
