import { toast } from "vue-sonner";
export class BaseApi {
  constructor(baseURL = "/main/main/") {
    this.baseURL = baseURL;
    this.isRefreshing = false; // Flag to check if a refresh is ongoing
    this.failedQueue = []; // Queue to store failed requests
  }

  // Method to handle token refresh
  async refreshToken() {
    try {
      const response = await fetch(
        "refresh?token=" + localStorage.getItem("refresh_token"),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (result.ok && result.data && result.data.access) {
        const newToken = result.data.access;
        localStorage.setItem("access_token", newToken); // Save new access token
        return newToken;
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Optionally clear tokens or log out user if refresh fails
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      // Handle logout or redirect to login page
      return null;
    }
  }

  // Retry failed requests after token is refreshed
  retryRequest(request) {
    return fetch(this.baseURL + request.url, request.options);
  }

  // Handle the queue of failed requests when refreshing token
  processQueue(error, token = null) {
    this.failedQueue.forEach((prom) => {
      if (token) {
        prom.resolve(token);
      } else {
        prom.reject(error);
      }
    });

    // Clear the queue
    this.failedQueue = [];
  }

  // Main request method with interceptor for 403 status
  async request(url, options = {}) {
    const token = localStorage.getItem("access_token"); // Get access token from storage
    options.headers = {
      "Content-Type": "application/json",
    };
    // Set Authorization header
    if (url !== "signup" && token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(this.baseURL + url, options);

      // If 403 - Token might be expired
      if (response.status === 403) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          const newToken = await this.refreshToken(); // Get a new token

          if (newToken) {
            // Retry the failed request
            this.processQueue(null, newToken);

            // Retry the original request
            return await this.retryRequest({ url, options });
          } else {
            throw new Error("Unable to refresh token. Please log in again.");
          }
        }

        // If refresh is ongoing, queue the request
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject });
        });
      }

      // If no error, parse and return the response
      const result = await response.json();
      if (!response.ok || !result.ok) {
        const error = result?.error?.detail || "An error occurred";
        if (error == "IncorrectPassword") {
          console.log(error == "IncorrectPassword");
          toast.error("رمز عبور وارد شده اشتباه است!");
        }

        throw new Error(error);
      }

      if (url == "signup" && result?.data?.access && result?.data?.refresh) {
        const { refresh, access } = result.data;
        localStorage.access_token = access;
        localStorage.refresh_token = refresh;
      }
      return result.data; // Return the actual data from the response
    } catch (error) {
      throw error;
    }
  }

  // HTTP methods (GET, POST, etc.)
  get(url, params) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.request(url + query, {
      method: "GET",
    });
  }

  post(url, data) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put(url, data) {
    return this.request(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete(url) {
    return this.request(url, {
      method: "DELETE",
    });
  }
}
