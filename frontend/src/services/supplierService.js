
import axiosClient from "../api/axiosClient";

const supplierService = {
  getAll: async (params = {}) => {
    const response = await axiosClient.get("/suppliers", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosClient.get(`/suppliers/${id}`);
    return response.data;
  },

  create: async (supplierData) => {
    const response = await axiosClient.post(
      "/suppliers",
      supplierData
    );
    return response.data;
  },

  update: async (id, supplierData) => {
    const response = await axiosClient.put(
      `/suppliers/${id}`,
      supplierData
    );
    return response.data;
  },

  remove: async (id) => {
    await axiosClient.delete(`/suppliers/${id}`);
    return id;
  }
};

export default supplierService;
