import axios from "axios";


const USGS_API = "https://m2m.cr.usgs.gov/api/api/json/stable";

interface Session {
  apiKey: string;
  sessionId: number;
}

async function getSession(): Promise<{ apiKey: string; sessionId: number }> {
  const username = process.env.USGS_USERNAME;
  const token = process.env.USGS_TOKEN;

  const res = await axios.post(`${USGS_API}/login-token`, {
    username,
    token,
  });

  const { data, sessionId, errorMessage } = res.data;
  if (!data || !sessionId) {
    throw new Error(`Login failed: ${errorMessage || JSON.stringify(res.data)}`);
  }

  console.log("USGS login success:", { sessionId });
  return { apiKey: data, sessionId };
}

export async function searchScenes(
  datasetName: string,
  
) {
  const { apiKey, sessionId } = await getSession(); // <-- pulls fresh apiKey + sessionId
  console.log("apikey", apiKey, sessionId)


  const response = await axios.post(`${USGS_API}/scene-search`, {
    apiKey,
    datasetName: "landsat_ot_c2_l2",
    userContext: { contactId: sessionId }, // <-- must be numeric sessionId, not hardcoded
    maxResults: 5,
    startingNumber: 1,
    sortOrder: "DESC",
  });

  return response.data;
}
