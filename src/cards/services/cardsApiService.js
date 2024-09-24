import axios from "axios";
const apiUrl = "https://card-server.onrender.com/cards";

export const getCards = async () => {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getCard = async (cardId) => {
  try {
    const response = await axios.get(`${apiUrl}/${cardId}`);
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getMyCards = async () => {
  const token = axios.defaults.headers.common["x-auth-token"];  
  if (!token) {
    return Promise.reject('No authentication token found');
  }

  try {
    const response = await axios.get(`${apiUrl}/my-cards`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const token = localStorage.getItem("my token");
    const { data } = await axios.delete(`${apiUrl}/${cardId}`, {
      headers: {
        "x-auth-token": token  
      }
    });
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createCard = async (card) => {
  try {
    const token = localStorage.getItem("my token"); 

    const { data } = await axios.post(
      `${apiUrl}`,
      card,
      {
        headers: {
          "x-auth-token": token  
        }
      }
    );
    return data;
  } catch (error) {
    
    console.error("Error creating card:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);  
      console.error("Error response status:", error.response.status); 
      console.error("Error response headers:", error.response.headers);  
    } else if (error.request) {
      console.error("No response received:", error.request);  
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error.message);
  }
};

export const editCard = async (cardId, normalaizedCard) => {
  try {
    const { data } = await axios.put(`${apiUrl}/${cardId}`, normalaizedCard);
    return data;
  } catch (error) {
    console.error("Error making request:", error.message); 
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {

      console.error("No response received for the request:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error.message);
  }
};

export const changeLikeStatus = async (cardId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/${cardId}`);
    return data;  
  } catch (error) {
    return Promise.reject(error.message);
  }
};
