import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';
const LAMBDA_URL = "https://f4vjywcntkk6ow7cpgibkfdrqi0amhgp.lambda-url.eu-north-1.on.aws/"; 

export const api = {
  login: (creds) => axios.post(LAMBDA_URL, creds),
  getTasks: (filters) => axios.get(API_URL, { params: filters }),
  createTask: (task) => axios.post(API_URL, task),
  updateTask: (id, task) => axios.put(`${API_URL}/${id}`, task),
  deleteTask: (id) => axios.delete(`${API_URL}/${id}`),
};