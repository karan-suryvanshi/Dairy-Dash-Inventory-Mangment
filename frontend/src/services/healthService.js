import axiosClient from "../api/axiosClient";

const healthService = {

  checkHealth: async () => {

    const response = await axiosClient.get("/health");

    return response.data;

  }

};

export default healthService;