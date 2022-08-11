export const settings = {
  host: "",
};

async function request(url, options) {
  try {
    const response = await fetch(url, options);

    if (response.ok == false) {
      if (response.status == 403) {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userId");
      }
      const error = await response.json();
      throw new Error(error.message);
    }

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      return response;
    }
  } catch (error) {
    // alert(error.message);
    throw error;
  }
}

function getOptions(method = "get", body) {
  const options = {
    method,
    headers: {},
  };

  const token = sessionStorage.getItem("authToken");

  if (token != null) {
    options.headers["X-Authorization"] = token;
  }

  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  return options;
}

export async function get(url) {
  return await request(url, getOptions());
}

