// api.js
const BASE_URL = 'http://127.0.0.1:8000/'; // Replace this with your API base URL

const getAccessToken = () => {
  // Implement the logic to get the access token from your preferred storage (e.g., local storage, Redux store, etc.)
  return 'your_access_token';
};

const getRefreshToken = () => {
  // Implement the logic to get the refresh token from your preferred storage (e.g., local storage, Redux store, etc.)
  return 'your_refresh_token';
};

const saveAccessToken = (access_token) => {
  // Implement the logic to save the access token to your preferred storage (e.g., local storage, Redux store, etc.)
};

const handleAuthenticatedRequest = async (url, method, data = null) => {
  const access_token = getAccessToken();

  const headers = {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(BASE_URL + url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    // Handle cases where the access token is expired (status code 401)
    if (response.status === 401) {
      const refresh_token = getRefreshToken();

      // Make a request to the token refresh endpoint to get a new access token
      const refreshResponse = await fetch(BASE_URL + '/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refresh_token }),
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        const new_access_token = data.access;
        saveAccessToken(new_access_token);

        // Retry the original request with the new access token
        const retryResponse = await fetch(BASE_URL + url, {
          method,
          headers: {
            ...headers,
            'Authorization': `Bearer ${new_access_token}`,
          },
          body: data ? JSON.stringify(data) : null,
        });

        return retryResponse.json();
      } else {
        // Handle refresh token error cases (e.g., refresh token expired, invalid refresh token)
        console.error('Error refreshing token:', refreshResponse);
        throw new Error('Error refreshing token');
      }
    }

    // Implement error handling and response parsing as needed

    return response.json();
  } catch (error) {
    // Handle other error cases
    console.error('Error:', error);
    throw error;
  }
};

export { handleAuthenticatedRequest };
