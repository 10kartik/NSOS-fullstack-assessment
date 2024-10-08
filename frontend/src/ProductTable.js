import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Switch from "@mui/material/Switch";
import productService from "./services/product";
import ProductModal from "./ProductModal"; // Import the ProductModal component

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        setProducts(response.data); // Assuming the response has a data field
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleRecommended = async (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, is_recommended: !product.is_recommended }
        : product
    );

    setProducts(updatedProducts);

    const product = updatedProducts.find((product) => product.id === id);
    await productService.updateProduct(product);
  };

  const toggleBestSeller = async (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, is_best_seller: !product.is_best_seller }
        : product
    );

    setProducts(updatedProducts);

    const product = updatedProducts.find((product) => product.id === id);
    await productService.updateProduct(product);
  };

  const toggleStatus = async (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, status: !!!product.status } : product
    );

    setProducts(updatedProducts);

    const product = updatedProducts.find((product) => product.id === id);
    await productService.updateProduct(product);
  };

  const handleEdit = (id) => {
    const product = products.find((product) => product.id === id);
    
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      console.log(`Product with id ${id} deleted`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductSubmit = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  return (
    <>
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
                  checked={product.is_recommended}
                  onChange={() => toggleRecommended(product.id)}
                />
              </td>
              <td>
                <Switch
                  checked={product.is_best_seller}
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
                <Switch
                  checked={product.status === 1}
                  onChange={() => toggleStatus(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          onSubmit={handleProductSubmit}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default ProductTable;
