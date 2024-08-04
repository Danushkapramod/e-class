
export function axiousWrapper(fn) {
  return async (params) => {
    try {
      const response = await fn(params);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        throw new Error(
          `Fetch failed: ${error.response.data.message || "An unexpected server error occurred."}`
        );
      } else if (error.request) {
        console.error("Network error:", error.request);
        throw new Error(
          "Network error: No response received from the server. Please check your network connection and try again."
        );
      } else {
        console.error("Error:", error.message);
        throw new Error(`An unexpected error occurred: ${error.message}`);
      }
    }
  };
}
