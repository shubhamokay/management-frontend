import React from 'react';

const ProductCard = ({ product, onEdit }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4">
      <div className="font-bold text-xl mb-2">{product.name}</div>
      <p className="text-gray-700 text-base">{product.description}</p>
      <div className="mt-4">
        <span className="block text-gray-600">Category: {product.category}</span>
        <span className="block text-gray-600">Price: ${product.price}</span>
        <span className="block text-gray-600">Stock: {product.stockQuantity}</span>
      </div>
      {onEdit && (
        <button onClick={() => onEdit(product)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Edit
        </button>
      )}
    </div>
  );
};

export default ProductCard;
