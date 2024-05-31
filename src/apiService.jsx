// apiService.js


const addJwtToken = (headers) => {
  const token = localStorage.getItem('jwtToken'); // Get token from storage
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
};

const apiRequest = async (url, method, data) => {
  console.log(data)
  const headers = {
    'Content-Type': 'application/json',
  };
  addJwtToken(headers);

  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export const loginBackend = async (credentials) => {
  const url = "/login.php";
  const response = await apiRequest(url, 'POST', credentials);
  const responseData = await response.json(); // Parse response body as JSON
  localStorage.setItem('jwtToken', responseData.token); // Store token in localStorage
};

export const postData = async (endpoint, data) => {
  const url = `${endpoint}`;
  return apiRequest(url, 'POST', data);
};

export const getData = async (endpoint) => {
  const url = `${endpoint}`;
  return apiRequest(url, 'GET');
};

export const logout = () => {
  localStorage.removeItem('jwtToken'); // Remove token from localStorage upon logout
};
