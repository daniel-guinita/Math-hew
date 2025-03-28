// api.js

const BASE_URL = 'mathhew-backend-deploy.vercel.app'; // Your backend URL

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json(); // return response from backend
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
