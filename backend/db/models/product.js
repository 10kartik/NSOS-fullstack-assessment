const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  isRecommended: {
    type: Boolean,
    required: true,
    index: true,
    default: false,
    alias: "is_recommended",
  },
  isBestSeller: {
    type: Boolean,
    required: true,
    default: false,
    alias: "is_best_seller",
  },
  status: {
    type: Number,
    required: true,
  },
});

// indexes
productSchema.index({ title: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isRecommended: 1 });
productSchema.index({ isBestSeller: 1 });

const schemaName = "products";

module.exports = mongoose.model(schemaName, productSchema);
