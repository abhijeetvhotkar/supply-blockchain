import ProductService from "../services/ProductService";
import Util from "../utils/Utils";

const util = new Util();

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const allProducts = await ProductService.getAllProducts();
      if (allProducts.length > 0) {
        util.setSuccess(200, "Products retrieved", allProducts);
      } else {
        util.setSuccess(200, "No Product found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addProduct(req, res) {
    if (!req.body.name) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newProduct = req.body;
    try {
      const createdProduct = await ProductService.addProduct(newProduct);
      util.setSuccess(201, "Product Added!", createdProduct);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default ProductController;
