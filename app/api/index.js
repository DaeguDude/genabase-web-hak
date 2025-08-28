export function getBackendBaseUrl() {
  if (typeof window !== "undefined") {
    // client side
    return window.ENV?.BACKEND_URL ?? "";
  } else {
    // server side
    return process.env.BACKEND_URL ?? "";
  }
}

export const BACKEND_URL = getBackendBaseUrl();

const BASE_URL = BACKEND_URL;
async function get(url_path, params_obj) {
  const session_id =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("session_id")
      : null;
  let fullUrl = BASE_URL + url_path;

  // Create URL object to properly handle query parameters
  const urlObj = new URL(fullUrl, window.location.origin);

  // Add session_id as a query param if present
  if (session_id) {
    urlObj.searchParams.set("session_id", session_id);
  }

  // Add other parameters if provided
  if (params_obj) {
    Object.keys(params_obj).forEach((key) => {
      if (params_obj[key] !== undefined && params_obj[key] !== null) {
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

async function newGet({ url_path, params_obj, session_id, locationOrigin }) {
  let fullUrl = BASE_URL + url_path;

  // Create URL object to properly handle query parameters
  const urlObj = new URL(fullUrl, locationOrigin);

  // Add session_id as a query param if present
  if (session_id) {
    urlObj.searchParams.set("session_id", session_id);
  }

  // Add other parameters if provided
  if (params_obj) {
    Object.keys(params_obj).forEach((key) => {
      if (params_obj[key] !== undefined && params_obj[key] !== null) {
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

async function post(url_path, body_obj) {
  const session_id =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("session_id")
      : null;
  let fullUrl = url_path;
  if (session_id) {
    const urlObj = new URL(url_path, BASE_URL);
    urlObj.searchParams.set("session_id", session_id);
    fullUrl = urlObj.toString();
  }
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

async function newPost({ url_path, body_obj, session_id }) {
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

async function patch(url_path, body_obj) {
  const session_id =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("session_id")
      : null;
  let fullUrl = url_path;
  if (session_id) {
    const urlObj = new URL(url_path, BASE_URL);
    urlObj.searchParams.set("session_id", session_id);
    fullUrl = urlObj.toString();
  }
  console.log("📡 PATCH Request to:", fullUrl, "with body:", body_obj);
  try {
    const response = await fetch(fullUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_obj),
    });

    if (!response.ok) {
      console.error("❌ PATCH Request failed:", {
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
    console.error("❌ PATCH Request error:", error);
    throw error;
  }
}

async function deleteRequest(url_path, body_obj) {
  const session_id =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("session_id")
      : null;
  let fullUrl = url_path;
  if (session_id) {
    const urlObj = new URL(url_path, BASE_URL);
    urlObj.searchParams.set("session_id", session_id);
    fullUrl = urlObj.toString();
  }
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

async function newDeleteRequest({ url_path, body_obj, session_id }) {
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

export async function authenticateWithBackend(shop, access_token) {
  console.log("🔐 Authenticating with backend for shop:", shop, access_token);
  const response = await fetch(`${BASE_URL}/auth/shopify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shop, access_token }),
  });

  if (!response.ok) {
    if (response.status === 425) {
      console.log("⏰ Backend returned 425 (Too Early), handling gracefully");
      return null; // or return a default session_id if needed
    }
    throw new Error("Failed to authenticate with backend");
  }

  console.log("authenticateWithBackend: ", response);
  const data = await response.json();
  return data.session_id;
}

export async function validateSession(sessionId) {
  if (!sessionId) {
    return false;
  }
  try {
    const url = new URL(`${BASE_URL}/auth/shopify/session`);
    url.searchParams.append("session_id", sessionId);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const isValid = response.status === 200;
    return isValid;
  } catch (error) {
    console.error("Error validating session:", error);
    return false;
  }
}

export async function getText2SQL(query) {
  return get("/text2sql", { query });
}

export async function getJobResult(job_id) {
  if (!job_id) return null;
  let url_path = `/response/${job_id}`;
  // The get() function will add session_id as a query param if present
  const response = await get(url_path, {});
  return response;
}

export async function getThread(thread_id) {
  return get(`/thread/${thread_id}`);
}

export async function getThreads({ locationOrigin, session_id }) {
  return newGet({
    url_path: "/threads",
    locationOrigin,
    session_id,
  });
}

export async function createThread(thread_id, thread_name) {
  return post(`/threads`, { thread_id, title: thread_name });
}

export async function deleteThread(thread_id, session_id) {
  return newDeleteRequest({
    url_path: `/threads/${thread_id}`,
    body_obj: {},
    session_id: session_id,
  });
}

export async function renameThread(thread_id, thread_name, session_id) {
  return newPost({
    url_path: `/threads/${thread_id}/rename`,
    body_obj: { title: thread_name },
    session_id: session_id,
  });
}

/**
 * Shop info response shape:
 * {
 *   id: string,
 *   phone_number: string,
 *   email: string,
 *   cs_agent: {
 *     name: string,
 *     phone_number: string
 *   }
 * }
 */

/**
 * Get shop info
 * @returns {Promise<{id: string, phone_number: string, email: string, cs_agent: {name: string, phone_number: string}}>}
 */
export async function getShopInfo() {
  return get(`/shop/info`);
}

/**
 * Update shop phone number
 * @param {string} phone_number
 * @returns {Promise<{success: boolean, phone_number: string}>}
 */
export async function updatePhoneNumber(phone_number) {
  return post(`/shop/info/phone_number`, { phone_number });
}

export async function updateCSAgentName(agent_name) {
  return patch(`/cs/agent/name`, { agent_name });
}

export async function updateCSAgentContactPhoneNumber(contact_phone_number) {
  return patch(`/cs/agent/contact_phone_number`, { contact_phone_number });
}

export async function updateCSAgentContactEmail(contact_email) {
  return patch(`/cs/agent/contact_email`, { contact_email });
}

export async function updateCSAgentContactPreference(contact_preference) {
  return patch(`/cs/agent/contact_preference`, { contact_preference });
}

export async function getCSConversationHistory(page = 0, page_size = 10) {
  return get(`/cs/conversations`, { page, page_size });
}

export async function getCSConversation(conversation_id) {
  return get(`/cs/conversations/${conversation_id}`);
}

export async function getTickets(
  page = 0,
  page_size = 10,
  status_filter = null,
  order_by = "created_at",
  order_direction = "desc"
) {
  return get(`/cs/tickets`, {
    page,
    page_size,
    status_filter,
    order_by,
    order_direction,
  });
}

export async function getConversationTickets(conversation_id) {
  return get(`/cs/conversations/${conversation_id}/tickets`);
}

export async function completeTicket(ticket_id) {
  return patch(`/cs/tickets/${ticket_id}/complete`, {});
}

export async function cancelTicket(ticket_id, cancellation_reason) {
  return patch(`/cs/tickets/${ticket_id}/cancel`, { cancellation_reason });
}

export async function getSessionInfo() {
  return get(`/auth/shopify/session`);
}

/**
 * Delete shop phone number
 * @returns {Promise<{success: boolean}>}
 */
export async function deletePhoneNumber() {
  return deleteRequest(`/shop/info/phone_number`, {});
}

export async function getShopSyncStatus(session_id = null) {
  if (session_id) {
    // When session_id is provided (server-side), use it directly
    const url = new URL("/shop/sync_status", BASE_URL);
    url.searchParams.set("session_id", session_id);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } else {
    // Client-side usage - use the existing get() function
    return get(`/shop/sync_status`);
  }
}
