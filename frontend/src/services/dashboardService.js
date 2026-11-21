import axiosClient from "../api/axiosClient";

// Extract total records from common Spring Boot response formats.
const getTotalRecords = (responseData) => {

  if (Array.isArray(responseData)) {
    return responseData.length;
  }

  if (typeof responseData?.totalElements === "number") {
    return responseData.totalElements;
  }

  if (Array.isArray(responseData?.content)) {
    return responseData.content.length;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data.length;
  }

  return 0;
};

const dashboardService = {

  getSummary: async () => {

    const [
      productResponse,
      categoryResponse,
      supplierResponse
    ] = await Promise.all([

      axiosClient.get("/products", {
        params: {
          page: 0,
          size: 1
        }
      }),

      axiosClient.get("/categories"),

      axiosClient.get("/suppliers", {
        params: {
          page: 0,
          size: 1
        }
      })

    ]);

    return {

      totalProducts: getTotalRecords(productResponse.data),

      totalCategories: getTotalRecords(categoryResponse.data),

      totalSuppliers: getTotalRecords(supplierResponse.data)

    };

  }

};

export default dashboardService;