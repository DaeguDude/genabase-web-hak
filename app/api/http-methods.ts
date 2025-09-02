const BASE_URL = "https://shopify-backend.staging.gena.co";

export async function get({
  url_path,
  params_obj,
  session_id,
}: {
  url_path: string;
  params_obj?: object;
  session_id: string;
}) {
  let fullUrl = BASE_URL + url_path;
  const urlObj = new URL(fullUrl);

  // Add session_id as a query param if present

  if (session_id) {
    urlObj.searchParams.set("session_id", session_id);
  }

  // Add other parameters if provided
  if (params_obj) {
    Object.keys(params_obj).forEach((key) => {
      // @ts-expect-error Temporary
      if (params_obj[key] !== undefined && params_obj[key] !== null) {
        // @ts-expect-error Temporary
        urlObj.searchParams.set(key, params_obj[key]);
      }
    });
  }

  fullUrl = urlObj.toString();
  console.log("📡 GET Request to:", fullUrl);
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("❌ GET Request failed:", {
        status: response.status,
        statusText: response.statusText,
        url: fullUrl,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error("❌ Failed to parse JSON response:", e);
      data = null;
    }
    return data;
  } catch (error) {
    console.error("❌ GET Request error:", error);
    throw error;
  }
}

export async function deleteRequest({
  url_path,
  body_obj,
  session_id,
}: {
  url_path: string;
  body_obj?: object;
  session_id: string;
}) {
  let fullUrl = url_path;
  const urlObj = new URL(url_path, BASE_URL);
  urlObj.searchParams.set("session_id", session_id);
  fullUrl = urlObj.toString();

  console.log("📡 DELETE Request to:", fullUrl, "with body:", body_obj);
  try {
    const response = await fetch(fullUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_obj),
    });

    if (!response.ok) {
      console.error("❌ DELETE Request failed:", {
        status: response.status,
        statusText: response.statusText,
        url: fullUrl,
        body: body_obj,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ DELETE Request error:", error);
    throw error;
  }
}

export async function post({
  url_path,
  body_obj,
  session_id,
}: {
  url_path: string;
  body_obj?: object;
  session_id: string;
}) {
  let fullUrl = url_path;
  const urlObj = new URL(url_path, BASE_URL);
  urlObj.searchParams.set("session_id", session_id);
  fullUrl = urlObj.toString();

  console.log("📡 POST Request to:", fullUrl, "with body:", body_obj);
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_obj),
    });

    if (!response.ok) {
      console.error("❌ POST Request failed:", {
        status: response.status,
        statusText: response.statusText,
        url: fullUrl,
        body: body_obj,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ POST Request error:", error);
    throw error;
  }
}
