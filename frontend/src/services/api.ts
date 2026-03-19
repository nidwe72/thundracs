// API service for communicating with the backend

export const API_BASE_URL = 'http://localhost:8080/api';

export async function fetchHello(): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/hello`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching hello message:', error);
    return 'Could not connect to backend';
  }
}

// Add more API functions here as needed
export const api = {
  fetchHello,
};