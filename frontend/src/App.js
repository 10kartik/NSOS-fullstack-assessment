import React, { useState } from "react";
import "./App.css";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const handleAddProduct = async (product) => {
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="App">
      <ProductTable products={products} />
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "30px",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>
      <ProductModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}

export default App;
