import axiosClient from "../api/axiosClient";

const categoryService = {

  // Get all categories
  getAll: async () => {

    const response = await axiosClient.get("/categories");

    return response.data;

  },

  // Get category by ID
  getById: async (id) => {

    const response = await axiosClient.get(`/categories/${id}`);

    return response.data;

  },

  // Create category
  create: async (categoryData) => {

    const response = await axiosClient.post(
      "/categories",
      categoryData
    );

    return response.data;

  },

  // Update category
  update: async (id, categoryData) => {

    const response = await axiosClient.put(
      `/categories/${id}`,
      categoryData
    );

    return response.data;

  },

  // Delete category
  remove: async (id) => {

    await axiosClient.delete(`/categories/${id}`);

    return id;

  }

};

export default categoryService;