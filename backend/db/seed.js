require("dotenv").config();
const productModel = require("./models/product");
const mongoConnection = require("./mongoConnection");
mongoConnection;

const productdata = [
  {
    title: "Wireless Headphones",
    description:
      "Noise-canceling over-ear headphones with 20-hour battery life.",
    price: 299.99,
    is_recommended: true,
    is_bestSeller: false,
    status: 1,
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable speaker with 10-hour battery life.",
    price: 99.99,
    is_recommended: false,
    is_bestSeller: true,
    status: 1,
  },
  {
    title: "Smartwatch",
    description: "Fitness tracker with heart rate monitor and GPS.",
    price: 199.99,
    is_recommended: true,
    is_bestSeller: false,
    status: 1,
  },
  {
    title: "Wireless Earbuds",
    description: "True wireless earbuds with 15-hour battery life.",
    price: 199.99,
    is_recommended: false,
    is_bestSeller: true,
    status: 1,
  },
  {
    title: "Portable Charger",
    description: "10000mAh power bank with fast charging.",
    price: 49.99,
    is_recommended: false,
    is_bestSeller: false,
    status: 1,
  },
];

const seedProducts = async () => {
  try {
    await productModel.deleteMany({});
    console.log("Existing admins deleted");

    for (const product of productdata) {
      const newProduct = new productModel({
        title: product.title,
        description: product.description,
        price: product.price,
        isRecommended: product.is_recommended,
        isBestSeller: product.is_bestSeller,
        status: product.status,
      });

      await newProduct.save();
    }

    console.log("All products saved");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    process.exit();
  }
};

seedProducts();
