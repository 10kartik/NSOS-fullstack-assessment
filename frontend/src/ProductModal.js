import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./ProductModal.css"; // Import the CSS file for styling
import productService from "./services/product";

Modal.setAppElement("#root");

const ProductModal = ({ isOpen, onRequestClose, onSubmit, product }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isRecommended, setIsRecommended] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setIsRecommended(product.is_recommended);
      setIsBestSeller(product.is_best_seller);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: product ? product.id : undefined,
      title,
      price,
      is_recommended: isRecommended,
      is_best_seller: isBestSeller,
    };
    try {
      if (product) {
        await productService.updateProduct(updatedProduct);
      } else {
        const addedProduct = await productService.addProduct(updatedProduct);
        onSubmit(addedProduct);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
    onRequestClose();
    // reload the page to see the added product
    window.location.reload();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={product ? "Edit Product" : "Add Product"}
      className="Modal"
      overlayClassName="Overlay"
    >
      <button className="close-button" onClick={onRequestClose}>
        &times;
      </button>
      <h2>{product ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isRecommended}
              onChange={(e) => setIsRecommended(e.target.checked)}
            />
            Is Recommended
          </label>
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
            />
            Is Best Seller
          </label>
        </div>
        <button type="submit" className="submit-button">
          {product ? "Update Product" : "Add Product"}
        </button>
      </form>
    </Modal>
  );
};

export default ProductModal;
