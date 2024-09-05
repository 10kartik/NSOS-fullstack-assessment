const express = require("express"),
  router = express.Router();
const _ = require("lodash");

const rootPrefix = "..",
  productModel = require(rootPrefix + "/db/models/product");

// Get Products list
router.get("/", async function (req, res) {
  try {
    const products = await productModel.find({});
    console.log("Products ", products);

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Products not found.",
      });
    }

    const snakeCaseProducts = products.map((product) =>
      _.mapKeys(product.toObject(), (value, key) => _.snakeCase(key))
    );

    return res.status(200).json({
      success: true,
      data: snakeCaseProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching products.",
    });
  }
});

// Create a new Product
router.post("/", async function (req, res) {
  console.log(req.body);
  // Validate request
  if (!req.body.title || !req.body.price) {
    return res.status(400).json({
      success: false,
      message: "Title and price are required fields.",
    });
  }

  try {
    const newProduct = new productModel({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      is_recommended: req.body.is_recommended || false,
      is_best_seller: req.body.is_best_seller || false,
      status: 1,
    });

    if (!newProduct) {
      return res.status(400).json({
        success: false,
        message: "An error occurred while creating the product.",
      });
    }

    await newProduct.save();

    // convert keys to snake_case
    const snakeCaseProduct = _.mapKeys(newProduct.toObject(), (value, key) =>
      _.snakeCase(key)
    );

    return res.status(201).json({
      success: true,
      data: snakeCaseProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the product.",
    });
  }
});

// Get a single Product
router.get("/:id", async function (req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // convert keys to snake_case
    const snakeCaseProduct = _.mapKeys(product.toObject(), (value, key) =>
      _.snakeCase(key)
    );

    return res.status(200).json({
      success: true,
      data: snakeCaseProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the product.",
    });
  }
});

router.put("/:id", async function (req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    if (req.body.hasOwnProperty("is_recommended")) {
      product.is_recommended = req.body.is_recommended;
    }

    if (req.body.hasOwnProperty("is_best_seller")) {
      product.is_best_seller = req.body.is_best_seller;
    }

    await product.save();

    // convert keys to snake_case
    const snakeCaseProduct = _.mapKeys(product.toObject(), (value, key) =>
      _.snakeCase(key)
    );

    return res.status(200).json({
      success: true,
      data: snakeCaseProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product.",
    });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await productModel.deleteOne({ _id: req.params.id });

    return res.status(204).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product.",
    });
  }
});

module.exports = router;
