import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const StockManagerPanel = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://management-backend-oput.onrender.com/api/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then(response => setProducts(response.data))
    .catch(error => setError('Error fetching products'));
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData(product);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://management-backend-oput.onrender.com/api/products/${selectedProduct._id}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then(response => {
      setProducts(products.map(product => product._id === selectedProduct._id ? response.data : product));
      setSelectedProduct(null);
    })
    .catch(error => setError('Error updating product'));
  };

  return (
    <div className="stock-manager-panel">
      <h1 className="text-3xl font-bold text-center my-6">Stock Manager Panel</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-wrap justify-center">
        {products.map(product => (
          <ProductCard key={product._id} product={product} onEdit={handleEditClick} />
        ))}
      </div>
      {selectedProduct && (
        <div className="edit-form mt-6 p-4 border border-gray-300 rounded">
          <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default StockManagerPanel;
