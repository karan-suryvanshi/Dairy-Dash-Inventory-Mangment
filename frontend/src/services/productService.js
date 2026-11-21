
import axiosClient from "../api/axiosClient";

const productService = {
  getAll: async (params = {}) => {
    const response = await axiosClient.get("/products", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosClient.get(`/products/${id}`);
    return response.data;
  },

  getCatalog: async (params = {}) => {
    const response = await axiosClient.get(
      "/products/catalog",
      { params }
    );
    return response.data;
  },

  create: async (productData) => {
    const response = await axiosClient.post(
      "/products",
      productData
    );
    return response.data;
  },

  update: async (id, productData) => {
    const response = await axiosClient.put(
      `/products/${id}`,
      productData
    );
    return response.data;
  },

  remove: async (id) => {
    await axiosClient.delete(`/products/${id}`);
    return id;
  }
};

export default productService;
