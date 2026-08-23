import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

/**
 * Sends listing details to the backend and returns the predicted room type
 * along with class probabilities.
 *
 * @param {object} payload - matches the FastAPI InputData schema
 * @returns {Promise<{predicted_room_type: string, probabilities: number[]}>}
 */
export async function predictRoomType(payload) {
  try {
    const { data } = await client.post("/predict", payload);
    return data;
  } catch (error) {
    if (error.response) {
      // FastAPI validation errors (422) come back as { detail: [...] }
      const detail = error.response.data?.detail;
      const message = Array.isArray(detail)
        ? detail.map((d) => `${d.loc?.at(-1)}: ${d.msg}`).join(", ")
        : detail || "The prediction service rejected this request.";
      throw new Error(message);
    }
    if (error.request) {
      throw new Error(
        "Couldn't reach the prediction service. Check that the API is running and reachable."
      );
    }
    throw new Error("Something went wrong while preparing the request.");
  }
}

export default client;
