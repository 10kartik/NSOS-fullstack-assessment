import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Switch from "@mui/material/Switch";

const initialData = [
  {
    id: 1,
    title: "Cherry Retro Cake",
    price: 299,
    recommended: false,
    bestSeller: false,
  },
  {
    id: 2,
    title: "Retro Cake",
    price: 299,
    recommended: false,
    bestSeller: false,
  },
  {
    id: 3,
    title: "Gender Reveal Cookies",
    price: 69,
    recommended: false,
    bestSeller: false,
  },
  {
    id: 4,
    title: "Black Retro Cake",
    price: 299,
    recommended: false,
    bestSeller: false,
  },
  {
    id: 5,
    title: "Classic Vintage",
    price: 299,
    recommended: false,
    bestSeller: false,
  },
  {
    id: 6,
    title: "Congrats Scarf & Cap",
    price: 15,
    recommended: false,
    bestSeller: false,
  },
  {
    id: 7,
    title: "Birthday Scarf & Cap",
    price: 15,
    recommended: false,
    bestSeller: false,
  },
  {
    id: 8,
    title: "Congrats Sleeve",
    price: 5,
    recommended: false,
    bestSeller: false,
  },
  {
    id: 9,
    title: "Birthday Sleeve",
    price: 5,
    recommended: false,
    bestSeller: false,
  },
  {
    id: 10,
    title: "Confetti Gun",
    price: 15,
    recommended: false,
    bestSeller: false,
  },
];

const ProductTable = () => {
  const [products, setProducts] = useState(initialData);

  const toggleRecommended = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, recommended: !product.recommended }
          : product
      )
    );
  };

  const toggleBestSeller = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, bestSeller: !product.bestSeller }
          : product
      )
    );
  };

  const handleEdit = (id) => {
    console.log(`Edit product with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete product with id: ${id}`);
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Selling Price</th>
          <th>Recommended</th>
          <th>Best Seller</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.title}</td>
            <td>SAR {product.price}</td>
            <td>
              <Switch
                checked={product.recommended}
                onChange={() => toggleRecommended(product.id)}
              />
            </td>
            <td>
              <Switch
                checked={product.bestSeller}
                onChange={() => toggleBestSeller(product.id)}
              />
            </td>
            <td>
              <FaEdit
                className="action-icon"
                onClick={() => handleEdit(product.id)}
              />
              <FaTrash
                className="action-icon"
                onClick={() => handleDelete(product.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
