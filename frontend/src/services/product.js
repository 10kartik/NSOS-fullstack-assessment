import ServiceClass from "./triggerApi";
import coreConstantsObj from "../constants";

class ProductService extends ServiceClass {
  async getProducts() {
    const url = coreConstantsObj.apiDomain + `/api/products`;

    console.log("getProducts", url);
    const response = await ServiceClass.getEndpoint(url);
    return response;
  }

  async addProduct(product) {
    const url = coreConstantsObj.apiDomain + `/api/products`;
    const response = await ServiceClass.postEndpoint(url, product);
    return response;
  }

  async getProduct(id) {
    const url = coreConstantsObj.apiDomain + `/api/products/${id}`;
    const response = await ServiceClass.getEndpoint(url);
    return response;
  }

  async updateProduct(product) {
    const url = coreConstantsObj.apiDomain + `/api/products/${product.id}`;
    const response = await ServiceClass.putEndpoint(url, product);
    return response;
  }

  async deleteProduct(id) {
    const url = coreConstantsObj.apiDomain + `/api/products/${id}`;
    const response = await ServiceClass.deleteEndpoint(url);
    return response;
  }
}

const productService = new ProductService();
export default productService;
