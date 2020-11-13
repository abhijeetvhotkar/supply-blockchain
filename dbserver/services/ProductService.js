import database from "../src/models";

class ProductService {
  static async getAllProducts() {
    try {
      return await database.Product.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addProduct(newProduct) {
    try {
      return await database.Product.create(newProduct);
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
